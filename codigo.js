let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

const cargarapp = ()=>{
    loginForm.classList.add('active');
}

require([
    "esri/config",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/widgets/Search",
    "esri/widgets/Locate",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/LayerList"
    ],
    (esriConfig,
    WebScene,
    SceneView,
    Search,
    Locate,
    Legend,
    Expand,
    LayerList)=>{
    esriConfig.apiKey = "AAPKc0b5b552c4324dc29a90351172d2b735eM1eJrecMDQYEQZi4rnGIPsjY_Llxx1p0nXXbkHOEsxXmYiO6lqTiBkAGXsSplrm";
    const webscene = new WebScene({
        portalItem: {
          id: "e719e3043e344afd99103297eda06793"
        }
      });

      const view = new SceneView({
        container: "viewDiv",
        map: webscene
      });

      let buscador = document.getElementById("container-search");

      const buscadorwidget = new Search({
        view:view,
        container: buscador,
        sources: [{
            url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
            singleLineFieldName: "SingleLine",
            outFields: ["Addr_type"],
            name: "ArcGIS World Geocoding Service",
            placeholder: "Address",
            resultSymbol: {
               type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
               url: this.basePath + "/images/search/search-symbol-32.png",
               size: 24,
               width: 24,
               height: 24,
               xoffset: 0,
               yoffset: 0
           }
          }]
      });

      const titlemap = document.getElementById("title-map");
      view.ui.add(titlemap,"top-right");

      const locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: (view, options)=> {
          options.target.scale = 2000;
          return view.goTo(options.target);
        }
      });

    view.ui.add(locate, "top-left");

    const legend = new Legend ({
        view:view
      });

    const expand = new Expand({
        expandIconClass: "esri-icon-legend",
        view: view,
        content: legend
      });

  view.ui.add(expand, "top-left");

  const imagenesgraficos = document.getElementById("contenedor-imagenes");

  const expandgraficos = new Expand({
    expandIconClass:"esri-icon-polyline",
    view:view,
    content:imagenesgraficos
  });

  view.ui.add(expandgraficos,"top-right");

  view.when(() => {
    const layerList = new LayerList({
      view: view
    });

    const expandlayer = new Expand({
      expandIconClass:"esri-icon-layer-list",
      view:view,
      content:layerList
    });
    view.ui.add(expandlayer,"top-right");
  });



  });
    

