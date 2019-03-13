const RouteCardController = require("../controller/RouteCardController");

class RouteCard extends RouteCardController{
    constructor(){
        super();
    }
    createPanel(_route){
        const card = this;
        let style_b=function(){
                return `<b style="color:${Colors.getStyleColor(_route.style.toLowerCase())}">${_route.style.toUpperCase()}</b>`;
            },
            rating = function(){
                let star_div = '';
                for(let i=0; i<=(parseFloat(_route.rating)-1);i++){
                    star_div +='<i class="fas fa-star"></i>';
                }
                return star_div;
            },
            div = `<div class="container climbing_panel" style="margin-top:2em;width:80%;">
                        <div class="card" id="card_${_route.id}" data-id="${_route.id}" data-rating="${_route.rating}">
                            <div class="card-header text-white" style="background-color: ${Colors.getGradeColor(_route.level)}">
                                <div class="float-left"><h6 class="card-text route_name">${_route.name}</h6></div>
                                <div class="float-right"><b class="card-text route_date">${_route.date}</b></div>
                            </div>
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col"><i class="fas fa-ruler-vertical fa-2x"></i></th>
                                        <th scope="col"><i class="fas fa-map-marked-alt fa-2x"></i></th>
                                        <th scope="col"><i class="far fa-check-circle fa-2x"></i></th>
                                        <th scope="col"><i class="fas fa-star-half-alt fa-2x"></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><b class="card-text route_level" style="color:${Colors.getGradeColor(_route.level.charAt(0))}">${_route.level}</b></td>
                                        <td>
                                            <b class="card-text route_area">${_route.area}</b>
                                            <br/>
                                            <span class="route_sektor">${_route.sektor}</span>
                                        </td>
                                        <td>${style_b()}</td>
                                        <td><b>${rating()}</b></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="card-footer">
                                 <b class="card-title">Kommentar</b>
                                 <p class="card-text route_sektor">${_route.kommentar}</p>
                                 <hr class="w-100 divider"/>
                                 <div class="container w-100 mt-1vh">
                                    <span class="float-right delete_route" data-id="${_route.id}" id="delete_${_route.id}"><i class="fas fa-trash fa-2x"></i></span>
                                    <span class="float-right mr-3 edit_route" data-id="${_route.id}" id="edit_${_route.id}"><i class="fas fa-pen fa-2x"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>`,
                click = 0;

        $(document)
            .on("click",`#card_${_route.id}`,function(){
                if(click===0) {
                    $(this).find('.card-footer').show();
                    click +=1;
                }else{
                    $(this).find('.card-footer').hide();
                    click=0;
                }
            })
            .on("click",`#delete_${_route.id}`,function(){
                click=0;
                card.delete($(this).data("id"));
            })
            .on("click",`#edit_${_route.id}`,function(){
                    click=0;
                    card.edit($(this).data("id"));
                });

        return div;
    }
}
module.exports = RouteCard;