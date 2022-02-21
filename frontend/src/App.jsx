import {Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import {Layout} from "./ui/Layout";
import "./App.scss";
import React from "react";
import {ProLearnerProvider} from "./context/ProLearnerContext";
import LanguageList from "./pages/language/LanguageList";
import TopicList from "./pages/topic/TopicList";
import AddTopic from "./pages/add/AddTopic";
import TopicTab from "./pages/topic/TopicTab";
import ProblemTab from "./pages/topic/ProblemTab";
import TopicProblems from "./pages/topic/TopicProblems";
import AddProblem from "./pages/add/AddProblem";
import Compiler from "./components/compiler/Compiler";
import Test from "./components/Test";
import SimpleDialogDemo from "./components/Test";


function App() {
    return (
        <ProLearnerProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Home/>
                        </>
                    }/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/languages" element={<LanguageList/>}/>
                    <Route path="/topic/all/:id" element={<TopicList/>}/>
                    <Route path="/topic/:id" element={<TopicTab/>}/>
                    <Route path="/addTopic/:id" element={<AddTopic/>}/>
                    <Route path='/test/:id' element={<TopicProblems/>}/>
                    <Route path='/problem/:id' element={<ProblemTab/>}/>
                    <Route path='/addProblem/:id' element={<AddProblem/>}/>
                    {/*<Route path='/' element={<Test/>}*/}
                </Routes>
            </Layout>
        </ProLearnerProvider>
    );
}

export default App;