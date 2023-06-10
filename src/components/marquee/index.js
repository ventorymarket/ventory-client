import Style from './style.module.css'
const Marquee = () => (
    <div className={Style.marquee}>
        <span className='cursor-pointer' onClick={() => window.open('https://hackathon.venom.network/', '_blank')}>
            Joined Venom Hackathon May 8,2023 - Ventory is now live on Venom Devnet
        </span> !!!
    </div>
)

export default Marquee;