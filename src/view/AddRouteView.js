const AddRouteController = require("../controller/AddRouteController");
const Levels = require("../models/Levels");
const Styles = require("../models/Styles");
const Autocomplete = require("../controller/AutoComplete");

class AddRouteView extends AddRouteController{
    constructor(){
        super();
        this.id_save_btn ="save_route";
        this.id_close_btn="closeAddRouteView";
    }
    init(){
        const model = this;
        let levels = function(){
            let level = new Levels(),
                list = `<select class="custom-select my-1 mr-sm-2" id="${model.id_level}">`;
            $.each(level.getRouteFrench(),function(key,value){
                list +=`<option value="${value}">${value}</option>`;
            });
            return `${list}</select>`;
        },
        rating=function(){
            let list = `<select class="custom-select my-1 mr-sm-2 rating" id="${model.id_rating}" class="form-control">`,
                stars=function(x){
                    let star_div = '';
                    for(let i=0; i<=x;i++){
                        star_div +='&#xf005;';
                    }
                    return star_div;
                };
            for(let i=1;i<=5;i++){
                list +=`<option value="${i}">${stars(i-1)}</option>`;
            }
            return `${list}</select>`;
        },
        styles=function(){
            let style = new Styles(),
                list = `<select class="custom-select my-1 mr-sm-2" id="${model.id_style}">`;
            $.each(style.styles,function(key,value){
                list +=`<option value="${value.toLowerCase()}">${value}</option>`;
            });
            return `${list}</select>`;
        },
        form =`
            <div class="modal" tabindex="-1" role="dialog" id="${this.id_modal}">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Neue Route</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                        <div class="form-group">
                                <label for="route_name">Routenname</label>
                                <input type="email" class="form-control" id="${this.id_name}"/>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Stil</label>
                                ${styles()}
                            </div>
                            <div class="form-group col-md-6">
                                  <label>Datum</label>
                                  <div class="input-group date" data-provide="datepicker">
                                    <input type="text" class="form-control" id="${this.id_date}"/>
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                  </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6 autocomplete">
                                <label for="inputAddress">Gebiet</label>
                                <input type="text" class="form-control" autocomplete="off" spellcheck="false" id="${this.id_area}"/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputAddress2">Sektor</label>
                                <input type="text" class="form-control" id="${this.id_sektor}"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="inputCity">Schwierigkeit</label>
                               ${levels()}
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputState">Rating</label>
                              ${rating()}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Kommentar</label>
                            <textarea class="form-control" id="${this.id_comment}" rows="3"></textarea>
                          </div>
                        </form>
                    </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="${this.id_save_btn}">Speichern</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="${this.id_close_btn}">Schließen</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        //date picker
        $('body').append(form);
        $('.datepicker').datepicker({
            format: 'mm/dd/yyyy',
            startDate: '-3d'
        });
        //bind the click events
        $(`#${this.id_save_btn}`).click(function(){model.save()});
        $(`#${this.id_close_btn}`).click(function(){model.close();});
        //open the add Dialog via bootstrap modal
        this.show();

        //autocomplete area`s
        taskRepo.getAllAreas()
            .then((data) => {
                let source = function(){
                  let data_set = [];
                  $.each(data,function(key,value){
                      data_set.push({"id":value.id,"name":value.name});
                  });
                  return data_set;
                };
                 // Initializing the autocomplete
                Autocomplete.autocomplete(document.getElementById(this.id_area),source());
        });
        //autocomplete sector`s
        taskRepo.getAllSectors()
            .then((data) => {
                let source = function(){
                    let data_set = [];
                    $.each(data,function(key,value){
                        data_set.push({"id":value.id,"name":value.name});
                    });
                    return data_set;
                };
                // Initializing the autocomplete
                Autocomplete.autocomplete(document.getElementById(this.id_sektor),source());
            });
    }

}
module.exports=AddRouteView;