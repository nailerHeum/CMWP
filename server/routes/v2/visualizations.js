const { Router } = require('express')

const router = Router()

const Intelligences = require('../../models/intelligence')

const jsonStrings = {
    title: 'Communities Monitoring Works Portal V2',
    msg_ok: 'ok',
    msg_notFound: 'Intelligence Not Found'
}

const LastDays = (n, option) => {
  let arr = Array.apply(0, Array(n)).map(function(v,i){return i}), weekday = new Array(7)
      
  weekday[0] = "Sunday"
  weekday[1] = "Monday"
  weekday[2] = "Tuesday"
  weekday[3] = "Wednesday"
  weekday[4] = "Thursday"
  weekday[5] = "Friday"
  weekday[6] = "Saturday"
  
  return arr.map(function(n) {
    let date = new Date()
    date.setDate(date.getDate() - n)
    return (function(day, month, year, weekendDay) {
    	switch(option) {
      	case 'weekday': return weekday[weekendDay]
      	default: return [year, (month+1)<10 ? '0'+ (month + 1): month+1, day<10 ? '0'+day : day].join('-')
      }
    })(date.getDate(), date.getMonth(), date.getFullYear(), date.getDay())
  })
}

router.get('/v2/visualize/wordcloud', async (req, res) => {
  let wordFreq = {}
  let agg
  if (req.query.by) {
    agg = await Intelligences.aggregate([
      { $match: { 'item.created_by': req.query.by } },
      { $group: { _id: '$item.title' } }
    ]).exec()
  } else {
    agg = await Intelligences.aggregate([
      {
        $group: {
          _id: '$item.title'
        }
      }
    ]).exec()
  }
  
  for (let tmp of agg) {
    let temp = tmp._id.replace('  ', ' ').replace('#', '').replace('@', '').replace('^', '').replace('%', '').replace('&', '').replace('*', '').replace('$', '').replace('.', ' ').replace(',', '').replace('\'', '').replace('"', '').replace('-', '').replace('~', '').replace('?', '').replace('!', '').split(' ')
    for (let word of temp) {
      if (!wordFreq[word]) {
        wordFreq[word] = 1
      } else {
        wordFreq[word]++
      }
    }
  }

  res.status(200).json({
    tooltip: {},
    series: [ {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [-90, 90],
        shape: 'pentagon',
        drawOutOfBound: false,
        textStyle: {
            normal: {
                color: function () { return `rgb(${[Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',')})` }
            },
            emphasis: {
                shadowBlur: 5,
                shadowColor: '#fafbfc'
            }
        },
        data: Object.keys(wordFreq).map((key, index) => ({ name: key, value: wordFreq[key] })).sort((a, b) => (b.value - a.value))
    } ]
  })
})

router.get('/v2/visualize/bar', async (req, res) => {
  let agg
  if (req.query.by) {
    agg = await Intelligences.aggregate([
      { $match: { 'item.created_by': req.query.by } },
      { $group: { _id: '$item.type', count: { $sum: 1 } } }
    ]).exec()
  } else {
    agg = await Intelligences.aggregate([
      {
        $group: {
          _id: '$item.type',
          count: { $sum : 1 }
        }
      }
    ]).exec()
  }

  res.status(200).json({
    xAxis: {
        type: 'category',
        data: ['특이동향', '법규위반의심']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: agg.map((item) => item.count),
        type: 'bar'
    }]
})
})

router.get('/v2/visualize/line', async (req, res) => {
    let days = LastDays(7)
    let count = [0, 0, 0, 0, 0, 0, 0]
    let agg
    
    if (req.query.by) {
      agg = await Intelligences.aggregate([
        { $project: { date: { $split: ["$item.date", "T"] }} },
        { $unwind: "$date" },
        { $match: { date: /[0-9]{4}-[0-9]{2}-[0-9]{2}/, 'item.created_by': req.query.by } },
        { $group: { _id: '$date', count: { $sum: 1 } } }
      ]).exec()
    } else {
      agg = await Intelligences.aggregate([
        { $project: { date: { $split: ["$item.date", "T"] }} },
        { $unwind: "$date" },
        { $match: { date: /[0-9]{4}-[0-9]{2}-[0-9]{2}/ } },
        { $group: { _id: '$date', count: { $sum: 1 } } }
      ]).exec()
    }
    
    for (let tmp of agg) {
      if (Math.ceil(Math.abs(new Date(days[0]) - new Date(tmp._id))) / (1000 * 60 * 60 * 24) < 7) {
        count[Math.ceil(Math.abs(new Date(days[0]) - new Date(tmp._id))) / (1000 * 60 * 60 * 24)] = tmp.count
      }
    }

    res.status(200).json({
      xAxis: {
          type: 'category',
          data: days
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: count,
          type: 'line',
          smooth: true
      }]
    })
})

router.get('/v2/visualize/pie', async (req, res) => {
  let agg
  if (req.query.by) {
    agg = await Intelligences.aggregate([
      { $match: { 'item.created_by': req.query.by } },
      { $group: { _id: '$item.meta.site', count: { $sum: 1 } } }
    ]).exec()
  } else {
    agg = await Intelligences.aggregate([
      {
        $group: {
          _id: '$item.meta.site',
          count: { $sum: 1 }
        }
      }
    ]).exec()
  }
  
  res.status(200).json({
    title: {
      text: '게시물 스크랩 출처',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <hr/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: agg.map(item => item._id)
    },
    series: [
      {
        name: '사이트명',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: agg.map((item) => ({ value: item.count, name: item._id })),
        itemStyle: {
          emphasis: {
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, .12)'
          }
        }
      }
    ]
  })
})

module.exports = router