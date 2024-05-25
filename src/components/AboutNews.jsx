import { useState, useEffect } from "react";
import Separator from "./common/Separator";
import { Link } from "react-router-dom";
import axios from "axios";
import getEnvironment from "../getenvironment";

function AboutNews(props) {
  const apiUrl = getEnvironment();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const confId = props.confid;
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   axios.get(`${apiUrl}/conferencemodule/home/conf/${confid}`, {
  //     withCredentials: true

  //   })
  //     .then(res => {
  //       setData(res.data);
  //       console.log(res.data);

  //     })
  //     .catch(err => console.log(err))

  // }, []);
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/conferencemodule/announcements/conf/${confId}`, {
      withCredentials: true

    })
      .then(res => {
        setNewsData(res.data);
        console.log(res.data);

      })
      .catch(err => console.log(err))

  }, [apiUrl, confId]);


  return (
    <div className=" container max-w-7xl flex flex-col items-center lg:flex-row lg:justify-evenly lg:items-start  mx-auto px-5 sm:px-10  lg:px-8 py-20">
      <div className="w-full  md:w-[700px]  s px-4 lg:w-3/5 ">
        <h2 className="text-4xl font-bold  text-accent-50 bg-accent-600 px-4 py-2 rounded-t-xl border-2 border-accent-600 ">
          About the <span className="text-4xl font-bold text-accent-50 py-2 ">Conference</span> 
        </h2>
        <Separator />
        <div className=" border-dashed border-accent-700 border-2 bg-accent-50 rounded-b-xl border-t-0 ">
        <p className="text-lg text-justify font-base text-accent-900 p-2 ">
          {/* {data ? <div className="min-h-[216px]" dangerouslySetInnerHTML={{ __html: data.aboutConf }} /> : <div className="min-h-[216px]"></div>} */}

                      EAIC-2025 aims to bring together leading researchers, academicians, and industry professionals worldwide to present cutting-edge research, discuss emerging trends, and network within various technology fields. The program includes keynote speeches, technical presentations, panel discussions, and technology exhibitions. Nestled in the heart of culturally vibrant Punjab, participants will experience the host institutes academic excellence and dynamic research environment. This conference is a celebration of innovation and collaboration, providing an unparalleled opportunity to engage with the global scientific community, present research, and contribute to advancing technology. Participants will delve into specialized tracks covering areas such as Nanoelectronics, VLSI Design, Communication Systems, Machine Learning, Power Electronics, Control, Renewable Energy, Electric Mobility, Security and Privacy etc. These tracks technical depth and breadth ensure that attendees can explore the latest advancements and applications in their fields.

                  </p></div>
        
        {/* <h2 className="text-4xl font-sans font-bold mt-4 text-gray-950  ">
          About IICHE
        </h2>
        <Separator />
        <p className="text-base text-justify font-sans font-base text-gray-800">
          {data ? <div dangerouslySetInnerHTML={{ __html: data.aboutIns }} /> : " "}
        </p> */}
      </div>
      <div className="sm:w-full md:w-[700px] sm:pr-6 lg:w-2/5 lg:ml-4 max-w-[700px] h-96 mt-10 sm:px-2 lg:mt-0 ml-5 md:mx-auto lg:px-5  ">
        <h2 className="text-4xl font-bold  text-accent-50 bg-accent-600 px-4 py-2 rounded-t-xl border-2 border-accent-600 shadow-xl shadow-accent-200 drop-shadow-xl">News</h2>

        <Separator />
        <div
          id="news"
          className="h-[440px]  overflow-auto bg-accent-100 rounded-b-xl p-4 border-2 border-accent-600 border-t-0"
        >
          <div
            className={`space-y-4  ${isMouseOver ? "animate-none cursor-default" : "animate-wiggle"
              }`}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={() => setIsMouseOver(false)}
          // className="flex flex-col  animate-wiggle"
          >

            {newsData.map((item) => (
              <Link key={item._id} to={`/news/${item._id}`}>

                <div className="relative my-4 rounded-xl hover:shadow-lg hover:shadow-accent-600/50 bg-white border-solid border-[3px] border-accent-500">
                  <div className="w-2 h-2 animate-ping bg-accent-600 absolute  -left-1 -top-1 rounded-full"></div>
                  <p className="text-lg font-medium  text-accent-600 p-4 -mt-2 border-b-2 border-dashed border-accent-400">{item.title}</p>
                  <p className="text-sm pt-4 p-4">
                    {item.metaDescription}
                  </p>


                </div>
              </Link>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutNews;