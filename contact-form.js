$("form").on("submit", function() {
    $.ajax({
        url: "https://umberto-fontanazza.github.io/eidon/",
        method: "POST",
        data: {message: "hello!"},
        dataType: "json"
    });
});