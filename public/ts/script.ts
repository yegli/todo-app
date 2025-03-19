// handling the completed filter as a dedicated button for now -> plan to use grouping for the other filters and might merge this into it too?
document.addEventListener("DOMContentLoaded", function () : void {
    document.getElementById("filterCompleted").addEventListener("click", function () : void {
        let currentUrl : URL = new URL(window.location.href);
        let showCompleted : boolean = currentUrl.searchParams.get("completed") === "true";

        if (showCompleted) {
            currentUrl.searchParams.delete("completed");
        } else {
            currentUrl.searchParams.set("completed", "true");
        }
        window.location.href = currentUrl.toString();
    });
});

document.addEventListener("DOMContentLoaded", function () : void {
    document.getElementById("filters").addEventListener("click", function () : void {
        const target = event.target as HTMLElement;
        let sortingValue: string = target.getAttribute("data-sort");
        if (!sortingValue) return; // required because otherwise I can't place completed toggle into the same div

        let currentUrl : URL = new URL(window.location.href);
        let currentOrder : string = currentUrl.searchParams.get("orderDirection");
        let newOrder : string = currentOrder === "desc" ? "asc" : "desc";

        currentUrl.searchParams.set("orderBy", sortingValue);
        currentUrl.searchParams.set("orderDirection", newOrder);

        window.location.href = currentUrl.toString();
    })
})

/* document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("style-toggle").addEventListener("click", function () {
        await changeTheme();

    })
}) */






