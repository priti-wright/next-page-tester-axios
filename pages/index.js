import Head from 'next/head'
import axios from "axios";
import styles from './index.module.css'

const Home = ({data}) => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js</a> {data?.name}!
      </h1>

      <p className={styles.description}>
        Get started by editing <code>pages/index.js</code>
      </p>
    </main>
  </div>
)

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_RECURRENT_URL}api/name`)
  const data = res.data;

  if (!data) {
    return {
      notFound: true,
    }
  }
  console.log(process.env.NEXT_PUBLIC_RECURRENT_URL)
  console.log(data)
  return {
    props: {data}, // will be passed to the page component as props
  }
}

export default Home
