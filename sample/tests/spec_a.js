require('./../src/index.js');
delete require.cache[require.resolve('./../src/index.js')]; // twice to run, second import makes new widget
require('./../src/index.js');

describe("converter tetsting", function () {
  beforeAll(() => {

    // first widget
    document.querySelectorAll("div.sorniaks_converter :nth-child(1)")[0].setAttribute('value', '10'); // source numerical system
    document.querySelectorAll("div.sorniaks_converter :nth-child(2)")[0].setAttribute('value', '7'); // target numerical system
    document.querySelectorAll("div.sorniaks_converter :nth-child(3)")[0].setAttribute('value', '120'); // number to be converted

    // second widget
    document.querySelectorAll("div.sorniaks_converter :nth-child(1)")[1].setAttribute('value', '1'); // source numerical system
    document.querySelectorAll("div.sorniaks_converter :nth-child(2)")[1].setAttribute('value', '2'); // target numerical system
    document.querySelectorAll("div.sorniaks_converter :nth-child(3)")[1].setAttribute('value', '3'); // number to be converted
  });

  it("generates div element", () => {
    expect(document.querySelector("div.sorniaks_converter")).toBeTruthy();
  });

  it("generates button", () => {
    expect(document.querySelector("div.sorniaks_converter :nth-child(5)").nodeName).toBe("BUTTON");
  });

  it("generates four inputs, 3 for input, one for output", () => {
    expect(document.querySelector("div.sorniaks_converter :nth-child(1)").nodeName).toBe("INPUT");
    expect(document.querySelector("div.sorniaks_converter :nth-child(2)").nodeName).toBe("INPUT");
    expect(document.querySelector("div.sorniaks_converter :nth-child(3)").nodeName).toBe("INPUT");
    expect(document.querySelector("div.sorniaks_converter :nth-child(4)").nodeName).toBe("INPUT");
  });

  it("converts properly on test case", () => {
    document.querySelectorAll("div.sorniaks_converter :nth-child(5)")[0].click();
    expect(document.querySelectorAll("div.sorniaks_converter :nth-child(4)")[0].value).toEqual('231');
  });

  it("shows invalid digit error and error note can be closed", () => {
    document.querySelectorAll("div.sorniaks_converter :nth-child(5)")[1].click();
    expect(document.querySelector("div.sorniaks_converter_error")).toBeTruthy();
    document.querySelector("div.sorniaks_converter_error div").click();
    expect(document.querySelector("div.sorniaks_converter_error")).toBeFalsy();
  });

  it("shows empty input fields error", () => {
    document.querySelectorAll("div.sorniaks_converter :nth-child(3)")[1].setAttribute('value', '');
    document.querySelectorAll("div.sorniaks_converter :nth-child(5)")[1].click();
    expect(document.querySelector("div.sorniaks_converter_error")).toBeTruthy();
  });

});