var config = {
    ".chosen-select": {},
    ".chosen-select-deselect": {
        allow_single_deselect: true
    },
    ".chosen-select-no-single": {
        disable_search_threshold: 10
    },
    ".chosen-select-no-results": {
        no_results_text: "Nothing in here."
    },
    ".chosen-select-width": {
        width: "95%"
    }
};

for (var selector in config) {
    $(selector).chosen(config[selector]);
}

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

        var userData = {
            name: $("#nameInput").val(),
            photo: $("#photoLink").val(),
            scores: [
                $("#q1").val(),
                $("#q2").val(),
                $("#q3").val(),
                $("#q4").val(),
                $("#q5").val(),
                $("#q6").val(),
                $("#q7").val(),
                $("#q8").val(),
                $("#q9").val(),
                $("#q10").val()
            ]
        };

        $.post("/api/friends", userData, function (data) {

            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo);

        });
    }
);