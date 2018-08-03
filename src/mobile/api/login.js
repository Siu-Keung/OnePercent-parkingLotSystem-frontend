import 'whatwg-fetch'
import conf from './conf'
import {Toast} from "antd-mobile";

export default {
    login(history, username, password) {

        fetch(`${conf.domain}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(value => {
            value.json().then(value1 => {

                if (value1.token != null){
                    history.push("/mobile/main")
                    localStorage.setItem("token",JSON.stringify(value1))
                } else {
                    Toast.fail("登录失败")
                }
            })
        })

    }
}