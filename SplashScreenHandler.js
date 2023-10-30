export class SplashScreenHandler {
    constructor() {
        this.docElementArray = [
            document.getElementById("splash-title"),
            document.getElementById("splash-howtoplay"),
            document.getElementById("splash-win"),
            document.getElementById("splash-lose")
        ];
    }

    showSplashScreen(index) {
        this.hideAllSplashScreens();
        this.docElementArray[index].style.opacity = "1";
        this.docElementArray[index].style.display = "block";
    }

    hideAllSplashScreens() {
        for (let i = 0; i < this.docElementArray.length; i++) {
            this.docElementArray[i].style.opacity = "0";
            this.docElementArray[i].style.display = "none";
        }
    }
}