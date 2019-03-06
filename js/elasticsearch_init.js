const elasticsearch = require('elasticsearch');
const el_cilent = new elasticsearch.Client({host : 'host:9200', log : 'trace'});

/////////////////////////////                 index생성               ///////////////////////////////////////////////
//index 생성 **index명 명시 대문자 안됨!, 그외  /나 특수문자 같은것들 안되니까 조심!
//params : index , setting(샤드, 레플리카스) 설정, mapping(문서 property 타입) 설정, aliases 설정
//el_cilent.indices.create({index : 'myindex'})
    //*****/따로 추가가능
    //el_cilent.indices.putMapping()
    //el_cilent.indices.putSettings();
    //el_cilent.indices.putAlias()
    //el_cilent.indices.putTemplate()

/////////////////////////////                 docoument생성               ////////////////////////////////////////
//이거는 다르네... document생성하는 거임.. 동일 index, type, id를 가진 document가 있으면 에러 발생
//el_cilent.create({index : 'test', type : '', id : '', body : {   } });
//el_cilent.index({index : 'test', type : '', id : '', body : {   } }); >>> 동일한듯

////////////////          index정보 조회 : cat객체를 통해 eleastic index 정보(샤드, 상태) 확인할 수 있습니다.      ///////////
//console.log(el_cilent.cat.indices());


///////////////////////////////               index 조회              ////////////////////////////////////////////

//el_cilent.indices.get({index : ''})
//el_client.indices.getFiledMapping({index : '', type : '', field : ''})>>필드의 매핑정보 조회

///////////////////////////////             document 갯수 조회               ////////////////////////////////////
//el_cilent.count();

///////////////////////////////               document조회              ////////////////////////////////////////////
//el_cilent.get({index : '', type : '', id : ''})

///////////////////////////////             document멀티 조회              ////////////////////////////////////////////
// el_cilent.mget({
//     body: {
//       docs: [
//         { _index: 'indexA', _type: 'typeA', _id: '1' },
//         { _index: 'indexB', _type: 'typeB', _id: '1' },
//         { _index: 'indexC', _type: 'typeC', _id: '1' }
//       ]
//     }
// });


///////////////////////////////               index 삭제            ////////////////////////////////////////
//el_cilent.indices.delete({index : 'myindex'});

///////////////////////////////                document삭제              /////////////////////////////////////////////
//el_cilent.delete({index : '', type : '', id : ''});

////////////////////////////                   document수정               ////////////////////////////////////
//el_client.update([params, [callback]]) >>>> 수정할때 주어지는 옵션이 다양하니 사용하기 전 찾아보고 사용하여야 합니다.
//script 옵션을 사용하여 동적으로 바꾸거나 파라미터옵션을 통해 데이터를 보내주어 스크립트 동작을 하도록 가능합니다.
//그 외에는 doc옵션을 통해 자체 변환
// **데이터의 변형(생성,수정,삭제)는 RDBMS에서만 하고 엘라스틱서치에서는 RDBMS의 데이터를 가져와 인덱싱하여 검색만 하는 방향을 추천합니다.

////////////////////////////                   ingest                     ////////////////////////////////////
//인덱싱 전 전처리 및 파이프라인 설정을 통해 수정하거나 프로세스 붙이는 작업 가능




