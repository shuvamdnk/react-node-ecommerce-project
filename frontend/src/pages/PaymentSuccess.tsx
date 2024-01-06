import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function PaymentSuccess() {
    useEffect(() => {
        document.title = 'Payment Success';
    },[])
    return (
        <body style={{ backgroundColor: 'rgb(248, 240, 255)' }}>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <p className="lead">
                        Payment Successfull.
                    </p>
                    <Link to="/" className="btn btn-outline-primary border-0 shadow-sm">
                        <b>Go Home</b>
                    </Link>
                </div>
            </div>
        </body>
    )
}
