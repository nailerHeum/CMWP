module.exports = {
  CT01: {
    'ALL_LIST': 'http://www.ilbe.com/list/ilbe',
    'KEYWORD_SEARCH': (keyword) => {
      return `http://www.ilbe.com/list/ilbe?listStyle=list&searchType=title_content&search=${encodeURI(keyword)}`
    }
  },
  CT08: {
    'ALL_LIST': 'http://www.ilbe.com/list/jjal',
    'KEYWORD_SEARCH': (keyword) => {
      return `http://www.ilbe.com/list/jjal?listStyle=list&searchType=title_content&search=${encodeURI(keyword)}`
    }
  },
  CT02: {
    'ALL_LIST': 'https://www.clien.net/service/group/board_all',
    'KEYWORD_SEARCH': (keyword) => {
      return `https://www.clien.net/service/search?q=${encodeURI(keyword)}`
    }
  },
  CT03: {
    'ALL_LIST': 'http://www.todayhumor.co.kr/board/list.php?table=society',
    'KEYWORD_SEARCH' (keyword) {
      return `http://www.todayhumor.co.kr/board/list.php?kind=search&table=society&search_table_name=society&keyfield=subject&keyword=${encodeURI(keyword)}&Submit=%EA%B2%80%EC%83%89`
    }
  },
  CT04: {
    'ALL_LIST': 'https://www.ygosu.com/community/issue',
    'KEYWORD_SEARCH': (keyword) => {
      return `https://www.ygosu.com/community?bid=issue&search=${encodeURI(keyword)}&searcht=s&add_search_log=Y&x=0&y=0`
    }
  },
  CT05: {
    'ALL_LIST': 'http://mlbpark.donga.com/mp/b.php?p=1&m=list&b=bullpen&query=&select=&user=',
    'KEYWORD_SEARCH': (keyword) => {
      return `http://mlbpark.donga.com/mp/b.php?select=sct&m=search&b=bullpen&select=sct&query=${encodeURI(keyword)}&x=0&y=0`
    }
  },
  CT06: {
    'ALL_LIST': 'https://www.fmkorea.com/news',
    'KEYWORD_SEARCH': (keyword) => {
      return `https://www.fmkorea.com/?vid=&mid=news&category=&search_keyword=${encodeURI(keyword)}&search_target=title_content`
    }
  },
  CT07: {
    'ALL_LIST': 'http://www.ppomppu.co.kr/zboard/zboard.php?id=issue',
    'KEYWORD_SEARCH': (keyword) => {
      return `http://www.ppomppu.co.kr/zboard/zboard.php?id=issue&category=&search_type=sub_memo&keyword=${encodeURI(keyword)}`
    }
  },
  CT09: {
    'ALL_LIST': 'https://theqoo.net/politics'
  },
  CT10: {
    'ALL_LIST': 'http://bbs.ruliweb.com/community/board/300148',
    'KEYWORD_SEARCH': (keyword) => {
      return `http://bbs.ruliweb.com/community/board/300148?search_type=subject_content&search_key=${encodeURI(keyword)}`
    }
  },
  CT11: {
    'ALL_LIST': 'https://www.dogdrip.net/politics',
    'KEYWORD_SEARCH' (keyword) {
      return `https://www.dogdrip.net/?_filter=search&act=&vid=&mid=politics&category=&search_target=title_content&search_keyword=${encodeURI(keyword)}`
    }
  },
  CT12: {
    'ALL_LIST': 'https://womad.life/r?page=1&r=latest',
    'KEYWORD_SEARCH': (keyword) => {
      return `https://womad.life/s?query=${encodeURI(keyword)}&l=title+content&o=id+desc`
    }
  },
  CT13: {
    'ALL_LIST': 'http://www.todayhumor.co.kr/board/list.php?table=sisa',
    'KEYWORD_SEARCH' (keyword) {
      return `http://www.todayhumor.co.kr/board/list.php?kind=search&table=sisa&search_table_name=sisa&keyfield=subject&keyword=${encodeURI(keyword)}&Submit=%EA%B2%80%EC%83%89`
    }
  }
}
