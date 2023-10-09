import React from 'react';
import styles from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  };

    function getCategories (){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let {data} = useQuery('categorySlider' , getCategories );

  return <> {data?.data.data? <div className='container'>
          <div className="row">
            <div className='col-md-12 py-3'>
                <Slider {...settings}> 
                    {data?.data.data.map((data)=> <div key={data._id}>
                        <img height={250}  src={data.image} className=' w-100'/> 
                        <h6 className=' pt-3 fw-bolder fs-5 text-center'>{data.name}</h6>
                      </div>
                    )}
                </Slider>
            </div>
          </div>
        </div>
        :'' }
  </>
}
