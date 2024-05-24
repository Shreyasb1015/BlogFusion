/* eslint-disable no-useless-catch */
import conf from  '../conf/conf.js'

import {Client,Account,ID} from 'appwrite';



export class AuthService{

    client=new Client();
    account;
    constructor(){

        //Constructor is used so as to ensure that  we only initialize the client  and account when the class is instantiated
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);


    }
    async createAccount({email,password,name})
    {
        try {

            const userAccount=await this.account.create(ID.unique(),email,password,name)
            if(userAccount)
            {
                //call another method
                return this.login({email,password});
            }else{
                return userAccount;
            }
            
        } catch (error) {

            throw error;
            
        }
    }
    async login({email,password})
    {
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {

            throw error;
            
        }
    }

    async getCurrentUser(){

        //This method is used to get the current user and to verify if he is logged in or not
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service::getCurrentUser::error',error)
        }

        return null;
    
    }

    async logout(){
        try {
             await this.account.deleteSessions();
        } catch (error) {
            console.log('Appwrite service::logout::error',error)
        }
    }
}

const authService=new AuthService();

export default authService; //exporting the instance of the class