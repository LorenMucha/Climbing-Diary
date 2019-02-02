const TableController = require("../controller/TableController");

class Table extends TableController{
    create(data){
        let grades =function(){
                let values = data.map(function(route){return route.level}),
                    result = [],
                    result_add=[];
                $.each(values, function(i, e) {
                    if ($.inArray(e, result) === -1) result.push(e);
                });
                $.each(result,function(key,val){
                    result_add.push({[val]:{"os":0,"rp":0,"flash":0}})
                });
                return result_add;
            },
            header = function(){
                let thead = '<thead><tr><th scope="col">Grad</th>';
                    $.each(Styles.getStyles(),function(key,val){
                        thead += ` <th scope="col">${val.toUpperCase()}</th>`;
                    });
                return `${thead}<th>Gesamt</th></thead>`;
            },
            body=function(){
                let tbody= `<tbody>`,
                    //build sta for the grades
                    count_styles = function() {
                        let result=grades();
                        $.each(grades(),function(x,level){
                            $.each(data, function (key, val) {
                                $.each(Styles.getStyles(),function(s,style)
                                {
                                    try {
                                        let grade = Object.keys(level)[0];
                                        if (val.level === grade && val.stil.toLowerCase() === style.toLowerCase()) {
                                            result[x][val.level][style] = result[x][val.level][style] + 1;
                                        }
                                    } catch (err) {}
                                });
                            });
                        });
                    return result;
                    };
                console.log(count_styles());
                $.each(count_styles(),function(key,val){
                    let grade=Object.keys(val)[0];
                    console.log(val[grade].os);
                    tbody += `<tr>
                                <td>${grade}</td>
                                <td>${val[grade].os}</td>
                                <td>${val[grade].rp}</td>
                                <td>${val[grade].flash}</td>
                                <td>${val[grade].os+val[grade].rp+val[grade].flash}</td>
                              </tr>`;
                });
                return `${tbody}</tbody>`
            },
            html = `
                <table class="table table-striped">
                     ${header()}
                     ${body()}
                    </table>
            `;
        $(`${this.id}`).html(html);
        body();
    }
}
module.exports=Table;