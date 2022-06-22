export function createPages(pages, pagesCount, currentPage) {
    if(pagesCount > 10) {
        if(currentPage > 5) {
            for (let i = currentPage-2; i <= currentPage+3; i++) {
                pages.push(i)
                if(i === pagesCount) break
            }
        }
        else {
            for (let i = 1; i <= 6; i++) {
                pages.push(i)
                if(i === pagesCount) break
            }
        }
    }  else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}
