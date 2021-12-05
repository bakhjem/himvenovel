import Link from '@/components/Link'
import { useEffect, useState } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import useSWR from 'swr'
import NewsletterForm from '@/components/NewsletterForm'
import { Row, Col, Divider, Card, Tag } from 'antd';
import 'isomorphic-unfetch'
const { Meta } = Card;
const MAX_DISPLAY = 5

export async function getStaticProps() {
  const res = await fetch('http://69.164.197.100:8001/update?page=1')
  const json = await res.json()
  const datanovel = json.data
  // const res1 = await fetch('http://69.164.197.100:8001/hotnovel?page=1')
  // const json1 = await res1.json()
  // const datahot = json1.data
  return { props: { datanovel } }
}

export default function Home({ datanovel }) {
  const [hotNovel, setHotnovel] = useState([])
  // console.log(datahot)
  useEffect(() => {
    async function fetchMyAPI() {
      const res = await fetch(`http://69.164.197.100:8001/hotnovel?page=1`)
      const json = await res.json()
      console.log(json)
      setHotnovel(json.data)
    }

    fetchMyAPI()

    // const datanovel = json[0]
  }, [])
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="layout">

        <div className='main-container'>
          <div className='container'>
            <div className='row mt-1 d-flex flex-wrap-reverse'>
              <div className='col-lg-9 container__left'>
                <div className='section-header'>
                  <div className='title'>
                    <span>LATEST UPDATES</span>
                  </div>
                </div>
                <div className='section box grid-items'>
                  {datanovel.map(item =>
                    <div className='latest-item'>
                      <div className='inner'>
                        <div className='thumb tooltip-hover'>
                          <Link href={`/novel/${item.idnovel}`}>
                            <img className='' src={item.cover} />
                          </Link>
                        </div>
                        <div className='meta'>
                          <div className='title'>
                            <h3>
                              <Link href={`/novel/${item.idnovel}`}>
                                <a>{item.novelsname}</a>
                              </Link>
                            </h3>
                          </div>
                          <div className='chapters'>
                            <div className='chap-item'>
                              <h4><a>{item.lasterchapter}</a></h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-3 container__right'>
                <div className='section box mt-1'>
                  <div className='section-header'>
                    <div className='title'>
                      <span>TOP READ</span>
                    </div>
                  </div>
                  <div className='top-list'>
                    <div className='tab-content mt-2'>
                      <div className='tab-panel active'>
                        {hotNovel.map(item =>
                          <div className='top-item'>
                            <div className='inner'>
                              <div className='thumb'>
                                <a>
                                  <Link href={`/novel/${item.idnovel}`}>
                                    <img src={item.cover} />
                                  </Link>

                                </a>
                              </div>
                              <div className='meta'>
                                <h3 className='title'>
                                  <a>{item.novelsname}</a>
                                </h3>
                                <h4 className='chap-item'>
                                  <a>{item.lasterchapter}</a>
                                </h4>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
        


      </div>


    </>
  )
}
