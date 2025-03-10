// handling the completed filter as a dedicated button for now -> plan to use grouping for the other filters and might merge this into it too?
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filterCompleted").addEventListener("click", function () {
        let currentUrl = new URL(window.location.href);
        let showCompleted = currentUrl.searchParams.get("completed") === "true";

        if (showCompleted) {
            currentUrl.searchParams.delete("completed");
        } else {
            currentUrl.searchParams.set("completed", "true");
        }
        window.location.href = currentUrl.toString();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filters").addEventListener("click", function () {
                let sortingValue = event.target.getAttribute("data-sort");
        if (!sortingValue) return; // required because otherwise I can't place completed toggle into the same div

        let currentUrl = new URL(window.location.href);
        let currentOrder = currentUrl.searchParams.get("orderDirection");
        let newOrder = currentOrder === "desc" ? "asc" : "desc";

        currentUrl.searchParams.set("orderBy", sortingValue);
        currentUrl.searchParams.set("orderDirection", newOrder);

        window.location.href = currentUrl.toString();
    })
})






