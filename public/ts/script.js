// handling the completed filter as a dedicated button for now -> plan to use grouping for the other filters and might merge this into it too?
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filterCompleted").addEventListener("click", function () {
        var currentUrl = new URL(window.location.href);
        var showCompleted = currentUrl.searchParams.get("completed") === "true";
        if (showCompleted) {
            currentUrl.searchParams.delete("completed");
        }
        else {
            currentUrl.searchParams.set("completed", "true");
        }
        window.location.href = currentUrl.toString();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filters").addEventListener("click", function () {
        var target = event.target;
        var sortingValue = target.getAttribute("data-sort");
        if (!sortingValue)
            return; // required because otherwise I can't place completed toggle into the same div
        var currentUrl = new URL(window.location.href);
        var currentOrder = currentUrl.searchParams.get("orderDirection");
        var newOrder = currentOrder === "desc" ? "asc" : "desc";
        currentUrl.searchParams.set("orderBy", sortingValue);
        currentUrl.searchParams.set("orderDirection", newOrder);
        window.location.href = currentUrl.toString();
    });
});
/* document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("style-toggle").addEventListener("click", function () {
        await changeTheme();

    })
}) */
