import { login } from 'api/index';
import {
	configure,
	observable,
	action,
	runInAction
} from 'mobx';

configure({ enforceActions: "always" });

export default class userStore {
	@observable userInfo = null;

	@action
	async fetch_userData(form) {
		try {
			const res = await login(form);
			if(res.data) {
				runInAction(() => {
					this.userInfo = {
						user_name: res.data.user_name,
						user_id: res.data.user_id,
						token: res.data.access_token,
						opr_type: res.data.user_type
					}
				})
			}
			else {
				return res.errmsg;
			}	
		} catch (error) {
            console.log(error);
        }
	}

}