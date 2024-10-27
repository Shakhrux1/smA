// Loading.js
import a from '../icon/Screenshot_2024-10-24_193508-removebg-preview (1).png'
import './styles.css'; // Assuming you prefer SCSS for styling

const Loading = () => {
  return (
    <>
      <div id="asa" style={{backgroundColor:"#054692", width:"100%",height:"100vh",position:'relative', zIndex:666}}>
        <div className="container">
            <div className="asa">
            <img className='loader' src={a} alt="" />
            </div>
        </div>
    </div>
      </>
  );
};

export default Loading;
