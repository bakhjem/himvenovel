import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import useSWR from 'swr'
import NewsletterForm from '@/components/NewsletterForm'
import { useRouter } from 'next/router'
import { Row, Col, Divider, Card, Tag, Breadcrumb } from 'antd';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import 'isomorphic-unfetch'
import {
    UnorderedListOutlined, ZoomInOutlined,
    CaretLeftOutlined, CaretRightOutlined, ZoomOutOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react'
const { Meta } = Card;
const MAX_DISPLAY = 5


function Novel({ novelchapter }) {
    const [novelName, setNovelName] = useState('')
    const [idPrev, setidPrev] = useState('')
    const [idNext, setidNext] = useState('')
    const [dataChapter, setDataChapter] = useState([])
    // console.log(novelchapter)
    useEffect(() => {
        async function fetchMyAPI() {
            const res = await fetch(`http://69.164.197.100:8001/novel?id=${novelchapter.idnovels}`)
            const json = await res.json()
            setNovelName(json[0]?.novelsname)
            setDataChapter(json[0]['chapterlist'])
        }

        fetchMyAPI()

        // const datanovel = json[0]
    }, [novelchapter])
    useEffect(() => {
        if (dataChapter.length !== 0) {
            for (let i = 0; i < dataChapter.length; i++) {
                if (
                    novelchapter.idchapter ===
                    dataChapter[i].idchapter
                ) {
                    if (i === 0) {
                        setidPrev('')
                        setidNext(dataChapter[i + 1].idchapter)
                    }
                    if (i > 0 && i < dataChapter.length - 1) {
                        setidPrev(dataChapter[i - 1].idchapter)
                        setidNext(dataChapter[i + 1].idchapter)
                    }
                    if (i === dataChapter.length - 1) {
                        setidPrev(dataChapter[i - 1].idchapter)
                        setidNext('')
                    }
                }
            }
        }
    }, [dataChapter])
    console.log(novelName)
    return (
        <>
            <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
            <div className="layout">

                <div className='main-container viewer'>
                    <div className='container'>
                        <div className='breadcrumbs-container'>
                            <div className='breadcrumbs-wrapper'>
                                <Breadcrumb>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>{novelchapter?.novelchapter}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                    </div>
                    <div className='viewer__container' id='viewer-page'>
                        <div className='viewer-header container skiptranslate' id='viewer-header' style={{ maxHeight: 55 }}>
                            <div className='chapter__actions-wrapper d-flex align-items-center flex-wrap-reverse'>
                                <ul className='chapter__actions d-flex  justify-content-end justify-content-lg-center align-items-center'>
                                    <li className='chapter-list'>
                                        <a className='load-chapters main__button' id='load-chapters' title='Chapters'>
                                            <UnorderedListOutlined />
                                        </a>
                                    </li>
                                    <div className="d-flex  justify-content-between justify-content-lg-center align-items-center">
                                        <div className='d-flex'>
                                            <li>
                                                <a id='btn-prev' className='main__button prev'>
                                                    <Link href={`/chapter/${novelchapter.idnovels}/${idPrev}`}>
                                                        <CaretLeftOutlined />
                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a id='btn-prev' className='main__button next'>
                                                    <Link href={`/chapter/${novelchapter.idnovels}/${idNext}`}>
                                                        <CaretRightOutlined />
                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a id='btn-prev' className='Decrease text size'>
                                                    <ZoomOutOutlined />
                                                </a>
                                            </li>
                                            <li>
                                                <a id='btn-prev' className='main__button next'>
                                                    <ZoomInOutlined />
                                                </a>
                                            </li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className='viewer-content container' id='viewer-content' style={{ marginTop: 55 }}>
                            <div className='section box mb-1'>
                                <div className='section-body trans-on-dark d-flex flex-wrap align-items-center justify-content-center'>
                                    <div className='chapter-info' style={{ padding: 20 }}>
                                        <h2>
                                            <a>{novelName}</a></h2>
                                    </div>
                                </div>
                            </div>
                            <div className='chapter__content' id="chapter__content" style={{ fontSize: 22 }} >
                                <div className='content-inner'>
                                    {ReactHtmlParser(novelchapter?.content)}
                                </div>
                            </div>
                            <div className='container bottom-buttons mt-1 mb-4'>
                                <div className='section box'>
                                    <div className='d-flex flex-column  align-items-center justify-content-center'>
                                        <div className='chapter__actions d-flex justify-content-center'>
                                            <li id='bottom-chapter-list' className='chapter-list chapter-list-wrapper'>
                                                <a className='load-chapters main__button' style={{ minWidth: 50 }}>
                                                    <UnorderedListOutlined />
                                                </a>
                                            </li>
                                            <li>
                                                <a className='main__button prev' style={{ minWidth: 60 }}>
                                                    <Link href={`/chapter/${novelchapter.idnovels}/${idPrev}`}>

                                                        <CaretLeftOutlined />

                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a className='main__button next' style={{ minWidth: 60 }}>
                                                    <Link href={`/chapter/${novelchapter.idnovels}/${idNext}`}>

                                                        <CaretRightOutlined />

                                                    </Link>
                                                </a>

                                            </li>
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
Novel.getInitialProps = async ({ query }) => {
    // console.log(query)
    const { id, chapter } = query
    const res = await fetch(`http://69.164.197.100:8001/chapter?novelid=${id}&chapterid=${chapter}`)
    // const res1 = await fetch(`http://3.1.203.88:8001/novel?id=${id}`)
    const json = await res.json()
    return { novelchapter: json }
}
export default Novel
