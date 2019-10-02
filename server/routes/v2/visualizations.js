const { Router } = require('express')

const router = Router()

const Intelligences = require('../../models/intelligence')

const jsonStrings = {
    title: 'Communities Monitoring Works Portal V2',
    msg_ok: 'ok',
    msg_notFound: 'Intelligence Not Found'
}

router.get('/v2/visualize/wordcloud', async (req, res) => {
  res.status(200).json({
    tooltip: {},
    series: [ {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [-90, 90],
        shape: 'pentagon',
        width: 600,
        height: 400,
        drawOutOfBound: true,
        textStyle: {
            normal: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [
            {
                name: 'Sam S Club',
                value: 10000,
                textStyle: {
                    normal: {
                        color: 'black'
                    },
                    emphasis: {
                        color: 'red'
                    }
                }
            },
            {
                name: 'Macys',
                value: 6181
            },
            {
                name: 'Amy Schumer',
                value: 4386
            },
            {
                name: 'Jurassic World',
                value: 4055
            },
            {
                name: 'Charter Communications',
                value: 2467
            },
            {
                name: 'Chick Fil A',
                value: 2244
            },
            {
                name: 'Planet Fitness',
                value: 1898
            },
            {
                name: 'Pitch Perfect',
                value: 1484
            },
            {
                name: 'Express',
                value: 1112
            },
            {
                name: 'Home',
                value: 965
            },
            {
                name: 'Johnny Depp',
                value: 847
            },
            {
                name: 'Lena Dunham',
                value: 582
            },
            {
                name: 'Lewis Hamilton',
                value: 555
            },
            {
                name: 'KXAN',
                value: 550
            },
            {
                name: 'Mary Ellen Mark',
                value: 462
            },
            {
                name: 'Farrah Abraham',
                value: 366
            },
            {
                name: 'Rita Ora',
                value: 360
            },
            {
                name: 'Serena Williams',
                value: 282
            },
            {
                name: 'NCAA baseball tournament',
                value: 273
            },
            {
                name: 'Point Break',
                value: 265
            }
        ]
    } ]
  })
})

router.get('/v2/visualize/metric', async (req, res) => {
    
})

router.get('/v2/visualize/bar', async (req, res) => {
    let agg = await Intelligences.aggregate([
      {
        $group: {
          _id: '$item.meta.site',
          count: { $sum: 1 }
        }
      }
    ]).exec()

    res.status(200).json({ data: agg })
})

router.get('/v2/visualize/pie', async (req, res) => {
  let agg = await Intelligences.aggregate([
    {
      $group: {
        _id: '$item.meta.site',
        count: { $sum: 1 }
      }
    }
  ]).exec()

  res.status(200).json({
    title: {
      text: '주요 특이동향 게시물 스크랩 출처',
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

router.get('/v2/visualize/map', async (req, res) => {
    
})

module.exports = router