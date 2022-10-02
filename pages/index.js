import sidebar from "../components/sidebar"

const styles ={
  container : `h-full w-full flex bg-[#fff]`
}

export default function Home() {
  return (
    <div className={styles.container}>
      <sidebar/>
      {/*<main/> */}
    </div>
  )
}
