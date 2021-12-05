import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import useSWR from 'swr'
import NewsletterForm from '@/components/NewsletterForm'
import { Row, Col, Divider, Card, Tag, Breadcrumb } from 'antd';
import 'isomorphic-unfetch'
const { Meta } = Card;
const MAX_DISPLAY = 5

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://69.164.197.100:8001/update?page=1')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts?.data?.map((post) => ({
        params: { id: post.idnovel },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const res = await fetch(`http://69.164.197.100:8001/novel?id=${params.id}`)
    const json = await res.json()
    console.log(json)
    const datanovel = json[0]
    return { props: { datanovel } }
}

export default function Novel({ datanovel }) {
    console.log(datanovel)

    return (
        <>
            <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
            <div className="layout">

                <div className='main-container book-details'>
                    <div className='container'>
                        <div className='breadcrumbs-container'>
                            <div className='breadcrumbs-wrapper'>
                                <Breadcrumb>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>{datanovel?.genresdata[0]?.['genrename']}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{datanovel?.novelsname}</Breadcrumb.Item>
                                </Breadcrumb>

                            </div>
                        </div>
                        <div className='row no-gutters'>
                            <div className='col-lg-8'>
                                <div className='book-info'>
                                    <div id='cover' className='cover box'>
                                        <div className='img-cover'>
                                            <img alt={datanovel?.novelsname} src={datanovel?.cover} />
                                        </div>
                                    </div>
                                    <div className='detail'>
                                        <div className='name box'>
                                            <h1>{datanovel?.novelsname}</h1>
                                            <h2>{datanovel?.othername}</h2>
                                        </div>
                                        <div className='meta box mt-1 p-10'>
                                            <p>
                                                <strong>Status :</strong>
                                                <Link>
                                                    <a>{datanovel?.status}</a>
                                                </Link>
                                            </p>
                                            <p>
                                                <strong>Genres :</strong>
                                                {datanovel?.genresdata.map(item =>
                                                    <Link>
                                                        <a>{item.genrename}</a>
                                                    </Link>
                                                )}
                                            </p>
                                            <p>
                                                <strong>Chapters :</strong>
                                                <Link>
                                                    <a>{datanovel?.chapterlist?.length}</a>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-1'>
                                    <div className='section box mt-1'>
                                        <div className='section-header'>
                                            <div className='title'>
                                                <span>SUMMARY & CHAPTERS</span>
                                            </div>
                                        </div>
                                        <div className='section-body chapters-wrapper'>
                                            <div className='tabs'>
                                                <div className='tab active'>
                                                    <div className='name'>
                                                        SUMMARY
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='tab-content mt-4'>
                                                <div id='info' className='tab-panel active'>
                                                    <p className='content mt-2' style={{ lineHeight: 1.8 }}>
                                                        {datanovel?.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='tabs'>
                                                <div className='tab active'>
                                                    <div className='name'>
                                                        CHAPTERS
                                                    </div>
                                                </div>
                                            </div>
                                            <div id='chapters' className='chapter-list-col'>
                                                {datanovel?.chapterlist.map(item =>
                                                    <div className='row-chapter'>
                                                        <span>
                                                            <Link href={`/chapter/${datanovel.idnovels}/${item.idchapter}`} >
                                                                <a>{item.chaptername}</a>
                                                            </Link>
                                                        </span>
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
