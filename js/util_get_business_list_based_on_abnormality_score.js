/**
 * Created by Jiaqiang on 12/6/2015.
 */
function get_businesses_list_based_on_abnormality_score(index, type, size, offset_number, location, category) {
    if (location == "" && category == "") {
        client.search({
            "index": index,
            "type": type,
            "size": size,
            "from": offset_number,
            "sort": ["abnormality_score:desc"]
        }, function (error, business_list) {
            console.log(business_list["hits"]["hits"]);
            var businessList = business_list["hits"]["hits"];
            renderBusinessList(businessList);
            renderLineCharts(businessList);
        });
    }
    if (location == "" && category != "") {
        client.search({
            "index": index,
            "type": type,
            "size": size,
            "from": offset_number,
            "sort": ["abnormality_score:desc"],
            "body": {
                "query": {
                    "filtered": {
                        "query": {"match": {"categories": category}}
                    }
                }
            }
        }, function (error, business_list) {
            var businessList = business_list["hits"]["hits"];
            renderBusinessList(businessList);
            renderLineCharts(businessList);
        });
    }
    if (location != "" && category == "") {
        console.log("aaddac");
        client.search({
            "index": index,
            "type": type,
            "size": size,
            "from": offset_number,
            "sort": ["abnormality_score:desc"],
            "body": {
                "query": {
                    "filtered": {
                        "query": {"match": {"full_address": location}}
                    }
                }
            }
        }, function (error, business_list) {
            var businessList = business_list["hits"]["hits"];
            renderBusinessList(businessList);
            renderLineCharts(businessList);
        });
    }
    if (location != "" && category != "") {
        console.log("d");
        client.search({
            "index": index,
            "type": type,
            "size": size,
            "from": offset_number,
            "sort": ["abnormality_score:desc"],
            "body": {
                "query": {
                    "filtered": {
                        "query": [
                            {"match": {"full_address": location}},
                            {"match": {"categories": category}}
                        ]
                    }
                }
            }
        }, function (error, business_list) {
            console.log(business_list);
            var businessList = business_list["hits"]["hits"];
            renderBusinessList(businessList);
            renderLineCharts(businessList);
        });
    }
}
