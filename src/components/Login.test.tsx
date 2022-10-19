import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../test-utils/mock";
import ArticleDetail from './ArticleDetail';
import Login from './Login';
import { getMockStore } from "../test-utils/mock";
import { Provider } from "react-redux";

    const mockStore = getMockStore({logIn:{
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
    }});

    const mockNavigate = jest.fn();
    jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockNavigate,
    }));
    const mockDispatch = jest.fn();
    jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
    }));

    global.alert = jest.fn();

describe("<Login />", ()=>{
    let login : JSX.Element;
    beforeEach(()=>{
        jest.clearAllMocks();
        login = (
            <Provider store = {mockStore}>
                <MemoryRouter>
                    <Routes>
                        <Route path = "/" element = {<Login/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
    })
    it("should render without errors", async ()=>{
        render(login);
        const loginButton =await screen.findByRole("button");
        const emailInput = await screen.findByPlaceholderText("email");
        const passwordInput = await screen.findByPlaceholderText("password")
        fireEvent.change(emailInput, {target : {value: "swpp@snu.ac.kr"}})
        fireEvent.change(passwordInput, {target : {value: "iluvswpp"}})
        fireEvent.click(loginButton);
        expect(emailInput.value).toBe("swpp@snu.ac.kr")
        expect(passwordInput.value).toBe("iluvswpp")
        //fireEvent.change(emailInput, {target : {value : "email@snu.ac.kr"}})
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
    it("should not login with wrong inputs", ()=>{
        render(login);
        const loginButton = screen.getByRole("button");
        const emailInput =  screen.getByPlaceholderText("email");
        const passwordInput =  screen.getByPlaceholderText("password")
        fireEvent.change(emailInput, {target : {value: "swppa@snu.ac.kr"}})
        fireEvent.change(passwordInput, {target : {value: "iluvswppa"}})
        fireEvent.click(loginButton);
        expect(emailInput.value).toBe("swppa@snu.ac.kr")
        expect(passwordInput.value).toBe("iluvswppa")
        //fireEvent.change(emailInput, {target : {value : "email@snu.ac.kr"}})
        expect(global.alert).toHaveBeenCalled();
    })
    /*it("should not render if there is no article", async()=>{
        renderArticle();
        jest.spyOn(axios, "get").mockImplementationOnce(()=> Promise.reject());
        expect(screen.queryAllByText("testing")).toHaveLength(0);
    })*/
})
