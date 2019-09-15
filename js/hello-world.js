var Color;
(function (Color) {
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Blue"] = 3] = "Blue";
    Color[Color["Yellow"] = 4] = "Yellow";
})(Color || (Color = {}));
var c = Color.Yellow;
console.log(c);
