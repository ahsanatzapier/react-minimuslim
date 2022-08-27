import Directory from "../../components/directory/directory.component";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      image: "https://i.ibb.co/cNWGLXb/hat.png",
    },

    {
      id: 2,
      title: "Bibs",
      image: "https://i.ibb.co/m9Wq5bs/bib.png",
    },
    {
      id: 3,
      title: "Bodysuits",
      image: "https://i.ibb.co/pQX1FWV/bodysuit.png",
    },
    {
      id: 4,
      title: "Pants",
      image: "https://i.ibb.co/vYnd7NL/pants.png",
    },
    {
      id: 5,
      title: "Socks",
      image: "https://i.ibb.co/qJh0bgP/socks.png",
    },
  ];

  return <Directory categories={categories} />;
};

export default Home;
