export default {
  data() {
    return {
      title: "Quill Editor",
      items: [
        {
          text: "Minton",
          href: "/",
        },
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Quill Editor",
          active: true,
        },
      ],
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],

            ["image"],
            ["code-block"],
          ],
        },
      },
      option: {
        theme: "bubble",
        modules: {
          toolbar: [
            ["bold", "italic", "link"],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
              "blockquote",
            ],
          ],
        },
      },
    };
  },
  middleware: "router-auth",
};
