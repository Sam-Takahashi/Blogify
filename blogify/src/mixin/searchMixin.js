export default {
    computed: {
        filteredBlogs: function () {
            return this.blogs.filter((blog) => {
                return blog.title.toLowerCase().match(this.search.toLowerCase())
                    || blog.content.toLowerCase().match(this.search.toLowerCase())

            })
        }
    }
    // computed: {
    //     filteredBlogs() {
    //         if (this.search !== '') {
    //             return this.blogs.filter((blog) => {
    //                 return blog.title.toLowerCase().match(this.search.toLowerCase())
    //                     || blog.content.toLowerCase().match(this.search.toLowerCase());
    //             });
    //         }

    //         return this.blogs;
    //     }
    // }
}