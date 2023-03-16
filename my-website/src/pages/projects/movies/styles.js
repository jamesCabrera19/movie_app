const theme = {
    backgroundColor: "#232323",
    panelBackgroundColor: "#1b1b1b",
    //
    fontColor: "#a09f9d",
    fontColorSecondary: "#eb6395",
    //

    buttonColor: "#eb6395",
    buttonFontColor: "#1b1b1b",
    boxShadowColor: "0 1px 1px rgba(0,0,0,.05)",
    themeColorToRGBA: function (alpha, hex) {
        const opacity = alpha || 0.9;
        const color = hex || "red";
        const [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));
        return `rgba(${r},${g},${b},${opacity})`;
    },
};

export { theme };
