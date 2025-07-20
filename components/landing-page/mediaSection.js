import styling from "./mediaSection.module.css"
export default function MediaSection(){
    return<div className={styling.main}>
        <div className={styling.container}>
            <div className={styling.subcontainer1}>
                <span className={styling.phone}>
                    <i className="ri-phone-fill"></i>
                    <a href="tel:+1234567890" className={styling.phoneNumber}>+1234567890</a>
                </span>
                <span className={styling.phone}>
                    <i className="ri-whatsapp-fill"></i>
                    <a href="https://wa.me/+1234567890" className={styling.phoneNumber}>+1234567890</a>
                </span>
            </div>
            <div className={styling.subcontainer2}>
                <a href="#">
                    <i className="ri-facebook-fill"></i>
                </a>
            </div>
        </div>
    </div>
}