import { screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../test-utils/mock";
import ArticleDetail from './ArticleDetail';

const renderArticle = ()=>{
    renderWithProviders(
        <MemoryRouter>
            <Routes>
                <Route path ='/articles/:id' element = {<ArticleDetail/>}/>
                <Route path ='*' element ={<Navigate to ={"/articles/3"}/>}/>
            </Routes>
        </MemoryRouter>,
        {
            preloadedState:{
                logIn:{
                    loggedIn: true
                },
                post:{
                    posting: [
                        {title : "testing", mykey : 3, content: "testing content", authorID: 0,},
                    ],
                    selectedPost: null,
                },
                comment:{
                    comments:[
                        {content : "comment test", theKey : 0, authorID : 0, articleID : 0, }
                    ],
                    selectedComment : null,
                },
                user:{
                    userList:[
                        {name : "user test", id : 0, email : "test email", password: "password", loggedIn : true}
                    ],
                    selectedUser : null,
                }
            },
        }
    );
};

describe("<ArticleDetail />", ()=>{
    it("should render without errors", async ()=>{
        jest.spyOn(axios, "get").mockImplementation(()=>{
            return Promise.resolve({
                loginData:{
                    loggedIn : true
                },
                postData:{
                    title : "testing", mykey : 3, content: "testing content", authorID: 0,
                },
                commentData:{
                    content : "comment test", theKey : 0, authorID : 0, articleID : 0,
                },
                userData:{
                    name : "user test", id : 0, email : "test email", password: "password", loggedIn : true
                }
            });
        });
        renderArticle();
        await screen.findByText("testing");
        await screen.findByText("testing content");
    });
    /*it("should not render if there is no article", async()=>{
        renderArticle();
        jest.spyOn(axios, "get").mockImplementationOnce(()=> Promise.reject());
        expect(screen.queryAllByText("testing")).toHaveLength(0);
    })*/
})