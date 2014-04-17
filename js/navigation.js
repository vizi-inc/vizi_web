var navigation;

function Navigation(){

  this.setHash = function(hash){
    window.location.hash = hash;
    animateCameraToLabel(hash);
  };

  this.clearHash = function(){
    history.pushState("", document.title, window.location.pathname);
  };


  this.goToHash = function(){
    var hash = window.location.hash.replace("#", "");
    if(panel[hash]){
      showContent(hash);
      summonFrame();

    }
  };

  this.init = function(){
    this.goToHash();
  };

}

function initNavigation(){
  navigation = new Navigation();
  navigation.init();
}


window.onhashchange = function(){
  navigation.goToHash();
};