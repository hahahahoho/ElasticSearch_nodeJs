const elasticsearch = require('elasticsearch');
const el_cilent = new elasticsearch.Client({host : 'localhost:9200', log : 'trace'});

// 1. index를 먼저 생성. type은 먼저 지정하지 않아도 됩니다.
el_cilent.indices.create({
    index : 'my_index'
})
// 2. 매핑설정 방법
el_cilent.indices.putMapping({
    index : 'my_index', //인덱스명
    type : 'test', //타입명
    body : {  //실 내용 기입
        analyzer : '', //검색과 색인 시 사용
        index_analyzer : '', //색인 시 사용
        search_analyzer : '', //검색 시 사용
        properties : {
            title : {type : '', index : '', analyzer : 'custom_analyzer'}, //type : text, keywork, date, long, double, boolean, integer, geo_point
                                             //index(색인방법) : analyzed(analyzer를 이용해서 분석 : 한글 형태소 분석기), not_analyzed(그냥 검색), no(검색 안되게 설정)
            title2 : {type : '',index : '', analyzer : '', search_analyzer : '', payload : true},
            title3 : {
                properties : {
                    title3_prop01 : {
                        type : '', analyzed : ''
                    }
                }
            }

        }
    }
})

el_cilent.indices.putSettings({
    index: 'my_index',
    type: 'test',
    body: {
        "index": {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            //분석기 설정
            "analysis": {
                //분석기 선언(토크타이저 매칭, 타입, 필터) type은 tokenizer가 standard아닐때 선언해주면 되는듯
                "analyzer": {
                    "custom_analyzer": {
                        "tokenizer": "standard",
                        "filter": [
                            "lowercase",
                            "trim",
                            "custom_synonym"
                        ]
                    },
                    //이부분은 내가 미리 선언해놓고 나중에 불러오면 토크나이저로 노리토크나이저를 부르는 구조인거 같음
                    "cnori_analyzer": {
                        "type": "custom",
                        "tokenizer": "cnori_tokenizer" // 그냥 nori_tokenizer써도 되는듯
                    }
                },
                //이부분이 중요함
                "tokenizer": {
                    //분석기 정의
                    "cnori_tokenizer": {
                        "type": "nori_tokenizer",
                        "decompound_mode": "mixed"
                    }
                },
                "filter": {
                    "custom_synonym": {
                        "type": "synonym_graph",
                        "synonyms": []
                    }
                }
            }
        }
    }
})

// 3. 매핑에 맞는 document 생성