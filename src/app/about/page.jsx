const TakeTime = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};

const About = async () => {

    await TakeTime();
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia cum hic 
          reprehenderit adipisci molestias dolore quo debitis rerum, ad illo ipsum 
          omnis tenetur quas consequuntur dolorem quis dignissimos ea ab.
        </p>
      </div>
    );
  
};


export default About;