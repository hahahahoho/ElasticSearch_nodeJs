const elasticsearch = require('elasticsearch');
const el_cilent = new elasticsearch.Client({host : 'localhost:9200', log : 'trace'});



//////////////////////////////////// search 사용법 //////////////////////////////////////////////

///////////    1. facets => filter        ////////////////////////////////////
// const response = await client.search({
//     index: 'myindex', //검색할 index명 / ,구분자로 여러개 인덱스 서치가능  / _all 모든 인덱스 탑색
//     analyzer : 이거는 세팅시 설정. 한글형태소나 이런거 적용시 사용합니다.
//     size : 검색 갯수 설정     from과 합쳐서 페이징 처리를 할 수 있다.
//     from : 몇번째 검색결과부터 출력할지 정합니다.
//     q : 전체에서 텍스트 검색
//     scroll : 대용량 데이터에서 한번에 결과를 보여주는 것이 아닌 여러번 분할하여 결과를 리턴할 때 사용합니다. 서버단에서 다만들어진 데이터를 처리하기 힘들기 떄문에... 메모리 소모가 크다고 합니다.
//     sort : [] order옵션을 통해 순서정렬, _score옵션을 통해 연관순 순으로 정렬, []일 경우 mode옵션 적용을 통해 최소값, 최대값, 평균값 등등 순으로 나열합니다.
//     nested타입 : 엘라스틱서치의 경우 여러개의 값으로 객체를 넣을 때 관계가 깨질 수 있는데, nested타입을 지정하면 관계를 이어줌. 말로는 설명하기 어려우니 아래 두 사이트를 참고합시다.
//                  (*참조 - https://blog.onsamiro.net/2017/06/28/elasticsearch-nested-object/     && https://opennote46.tistory.com/188)
//     _source : 보고자 하는 필드명을 입력하면 해당 필드만 볼 수 있습니다.
//     highlight : 검색결과 단어와 매칭되는 단어를 표시 <em>태그로 강조하여 표기합니다.
//     aggs : 통계를 낼 때 사용한다. group by와 유사한 기능. 묶어서 보여주거나 max / min / avg 와 같은 그룹별 통계 적용 가능합니다.
//     body: {
//         fields : [] 필드옵션으로 원하는 필드만 서치 가능합니다.
//       
//         query: { //검색의 의미 쿼리문에서 select라 생각합시다.
//              bool :  조건을 참 거짓으로만 평가    >>>>> filtered대신 사용
//                      must, should, not_must : [] 조건에 따른 true/false 리턴
//                              match : 
//                      filter : 조건에 따른 true/false 리턴. 연관성 및 유사도를 평가하지 않고 캐시를 지원하여 빠르다고 합니다.
//                              term : 텀쿼리는 tokenize 결과에 따른 완전일치. 
//                              (*참조 - https://findstar.pe.kr/2018/01/19/understanding-query-on-elasticsearch/)
//                              range : 지정한 범위 포함되는 문서 결과리턴 - 수, 날짜 등
//                              exist : 선택한 필드의 값에 어떤값이라도 존재하면 true 아니면 false;
//              match: { //어떻게 검색할 것인가. match, match_all ** 텀쿼리와 다르게 tokenize결과를 분석하고 하나라도 일치할 때 결과를 가져옵니다.
//                      **match_phrase : tokenize결과를 분석하는 것을 동일하나 순서도가 맞는 것만 검색 결과에 포함합니다.
//                      **multi_match : {'필드1' : '값', '필드2' : '값', 'type' : '값'} 여러개의 필드를 통해 검색할 때 사용합니다.
//                          (=>type : 1, best_field - 한 필드에서 정확하게 매치되면 점수가 높음. 2,most_filed - 매치되는 필드가 많을 수록 점수가 높음. 3, cross_fileds - 1번+2번
//                      title: {
//                          'query' : 'value',
//                          'fuzziness' : 'AUTO' : 값이 조금 차이나더라도 매치가 되도록 할 때 사용하는 옵션 : 편집 거리 알고리즘을 적용 - 유사도판단
//                          'boost' : 가산점 비율 조정 / 일치여부에 따라 점수를 더 높게 부여. 기본값은 1입니다.
//                      }
//              regex : 정규식을 통한 문서 search를 가능하게 합니다.
//                      (*참조 - https://www.elastic.co/guide/en/elasticsearch/reference/6.7/query-dsl-regexp-query.html)
//         }
//         
//       },

///////////////////////////    삭제    /////////////////////////////
//       facets: { >>>>>>>>>>>>>>>>>>>>>> 삭제되고 filter로 바뀌었습니다.
//         tags: {
//           terms: {
//             field: 'tags'
//           }
//         }
//       }
//     }
//   });