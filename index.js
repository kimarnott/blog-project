import express from "express";
import bodyParser from "body-parser";
import os from "os";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {json: posts});
});

app.get("/post/:postID", (req, res) => {
  const reqPost = req.params["postID"];
  const post = posts[reqPost - 1];
  res.render("blogpost.ejs", {post: post});
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
})

app.post("/delete/:postID", (req, res) => {
  const reqPost = req.params["postID"];
  posts.splice(reqPost-1, 1);
  for (let i=0; i<posts.length; i++) {
    posts[i].id = i + 1;
  }
  res.redirect('/');
});

app.get("/edit/:postID", (req, res) => {
  const reqPost = req.params["postID"];
  const post = posts[reqPost - 1];
  res.render("edit.ejs", {post: post});
});

app.post("/update/:postID", (req, res) => {
  const plsWork = []
  for (let i=0; i<req.body.body.split(os.EOL).length; i++) {
    plsWork.push(req.body.body.split(os.EOL)[i]);
  };
  if (req.params["postID"] == "0") {
    let postID = posts.length + 1;
    const post = {
      id: postID,
      title: req.body.title,
      subtitle: req.body.subtitle,
      author: req.body.author,
      body: plsWork,
      img_url: req.body.img_url
    };
    posts.push(post);
  } else {
    const reqPost = req.params["postID"];
    const post = posts[reqPost - 1];
    post.title = req.body.title;
    post.subtitle = req.body.subtitle;
    post.author = req.body.author;
    post.body = plsWork;
    post.img_url = req.body.img_url;
  };
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

var posts = [
  {
    id: "1",
    title: "The Best Sleeping Position I've Found",
    subtitle: "I always get the best morning/day/night's rest with this one",
    author: "Jake-Jake",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales ante sit amet bibendum elementum. Vestibulum ut sapien tincidunt, facilisis nisl et, sollicitudin arcu. Maecenas tortor eros, ultricies bibendum lorem vitae, commodo consequat leo. Aliquam aliquam dictum purus, commodo gravida arcu volutpat vel. Cras sit amet justo rhoncus, lacinia metus sed, porttitor ligula. Pellentesque semper placerat arcu, id efficitur felis maximus id. Curabitur tincidunt felis non mollis posuere.",
      "Duis rutrum, elit non laoreet congue, purus metus ornare dui, ac fringilla orci lacus id ante. Nulla egestas leo id augue blandit consequat. Aenean feugiat ex auctor nisl vestibulum, id ornare est dapibus. Proin eu ipsum et leo cursus tempor. Nam accumsan blandit diam, at placerat arcu scelerisque at. Aliquam erat volutpat. Ut blandit ligula id rhoncus dignissim. Nulla consectetur vel erat eu rutrum. Ut fermentum, diam vitae placerat finibus, sem urna tincidunt urna, ut venenatis magna felis non tellus. Suspendisse sodales elit tortor, at semper quam pellentesque in. Sed non nisi dolor.",
      "Vestibulum eu porta lectus. Fusce eget dolor nunc. Proin lectus enim, rhoncus sit amet augue accumsan, varius vulputate sem. Sed ac orci tempus, sodales ex feugiat, eleifend dolor. Vestibulum convallis laoreet metus, et auctor nunc tincidunt eu. Phasellus tempor purus nec sapien placerat luctus. Sed semper sagittis neque. Curabitur non sollicitudin erat, ultrices malesuada augue. Nunc lobortis ex ac diam vehicula, a facilisis mi vestibulum. Integer consequat condimentum elit ac imperdiet. Quisque lorem arcu, venenatis vitae purus sit amet, varius tincidunt est."
    ],
    img_url: "/img/sleeping.jpg"
  },
  {
    id: "2",
    title: "The Fine Art of Whining",
    subtitle: "The Dummy's Guide to Getting Attention",
    author: "Jake-Jake",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget mollis lectus. Aenean eu turpis mi. Morbi commodo molestie ullamcorper. Nulla malesuada rhoncus molestie. Pellentesque non purus rhoncus, egestas lorem iaculis, pellentesque nulla. Sed et felis in nisi fringilla fringilla. Sed quis eros pharetra, sagittis tellus eu, ultricies urna. Proin bibendum erat ut laoreet iaculis. Vestibulum mattis, enim in laoreet auctor, mauris elit fringilla mi, sed semper leo massa vel nulla. Etiam cursus mauris neque, ac condimentum odio pharetra eu. Vivamus eros libero, dapibus id dui blandit, vehicula pharetra turpis. Ut luctus porta ultrices. Proin pulvinar, justo eu posuere tincidunt, libero ipsum congue ante, at facilisis augue orci congue purus. Praesent cursus turpis vel condimentum tincidunt. Ut fringilla nisi sit amet magna ullamcorper, non luctus nunc feugiat. Donec fermentum augue in arcu vulputate ullamcorper.",
      "Suspendisse enim erat, malesuada nec molestie sit amet, ultricies at purus. Curabitur malesuada purus a volutpat pretium. Nunc quis malesuada nibh. Nulla augue arcu, dignissim at imperdiet et, consectetur a arcu. Aliquam erat volutpat. In et augue eget justo ultricies bibendum. Phasellus volutpat elit non felis dapibus finibus. Cras nec bibendum nibh. Donec eu enim ac lacus sodales consectetur ac sit amet eros. Nulla ac dapibus diam. Fusce ultrices ullamcorper faucibus. In vehicula, dui id porttitor bibendum, ligula ipsum pharetra tellus, ut porttitor ligula neque auctor eros. Etiam fermentum tellus non tempor semper. Proin tempus fringilla tortor eget ullamcorper.",      
      "Praesent eget velit suscipit purus efficitur interdum. Vivamus vestibulum in lacus vitae efficitur. Pellentesque sagittis, est sit amet interdum lobortis, magna ipsum rhoncus libero, ac dictum ante odio non sem. Aenean eu urna id quam tempus cursus. Donec mauris quam, sodales in nulla vel, congue hendrerit quam. Nam quam risus, pulvinar quis dictum eu, semper sit amet neque. Ut at felis fermentum ex semper lacinia ut id diam. Vivamus varius semper lectus, vitae pretium ex feugiat non. Curabitur sollicitudin metus ut iaculis vehicula.",
      "Cras ex turpis, porttitor ac efficitur mollis, interdum ac velit. Duis vel convallis eros, sed ultrices urna. Aliquam erat volutpat. Sed neque nunc, bibendum a dolor sed, tempus pellentesque tellus. Integer laoreet eu urna eu varius. Vivamus ultrices facilisis sapien, vel bibendum eros placerat non. Curabitur pellentesque dolor sed quam ultrices imperdiet. Donec consequat risus in diam fermentum rutrum. Curabitur non imperdiet mauris. Mauris vestibulum eleifend magna, nec cursus ante ultricies non. Ut tempor nunc ante, in maximus nisl euismod ac.",
      "Donec vel nisi vel nisi placerat varius. Nam a diam pulvinar, blandit sapien et, rhoncus dolor. Praesent id tellus in leo egestas pharetra vitae ut sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vel ullamcorper eros. Fusce pellentesque congue vehicula. Maecenas quis ultricies magna. Donec ut congue magna, eleifend mattis diam. Morbi lobortis commodo augue."
    ],
    img_url: "/img/woof.jpg"
  },
  {
    id: "3",
    title: "How to Train Your Human",
    subtitle: "Get what you want, when you want it",
    author: "Jake-Jake",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate tempor feugiat. Sed velit mauris, efficitur in libero vitae, auctor dapibus justo. Nam ullamcorper ipsum id bibendum tincidunt. Proin enim justo, sagittis nec pretium quis, porta quis felis. Quisque in nunc purus. Integer eu consequat arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus sed purus quis orci semper iaculis. Fusce neque tortor, fermentum a neque sed, commodo dignissim erat. Duis quis ex ac dolor consequat pulvinar ut at justo. Nam imperdiet mauris lorem, vel aliquet nulla iaculis quis.",
      "Sed faucibus, ex convallis mattis sollicitudin, risus ex vulputate sapien, sed euismod leo tortor a ex. Cras quis augue at mauris aliquam volutpat. Fusce eu mauris quis nunc maximus cursus non sit amet est. Sed aliquam finibus elementum. Aliquam erat volutpat. Nam maximus sed nunc vel ultricies. Nam convallis, lorem quis suscipit hendrerit, tellus dui ultricies eros, ac dignissim magna justo quis mi. Mauris luctus augue quis ante gravida, a dapibus nibh accumsan. In mollis vulputate tincidunt. Sed non cursus justo."
    ],
    img_url: "/img/happy.jpg"
  },
];
