import Layout from './components/layouts/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
        {/* <Route path='register/*' element={<RegisterPage />} />
        <Route path='howtopay/*' element={<HowtoPayPage />} />
        <Route path='article/forthelove/*' element={<ForthelovePage />} />
        <Route path='programs/afterschool/*' element={<AfterSchoolPage />} />
        <Route
          path='programs/currentevents/*'
          element={<CurrentEventsPage />}
        />
        <Route path='programs/debate/*' element={<DebatePage />} />
        <Route path='programs/reading/*' element={<ReadingPage />} />
        <Route path='programs/science/*' element={<SciencePage />} />
        <Route path='programs/spanish/*' element={<SpanishPage />} />
        <Route path='programs/speech/*' element={<SpeechPage />} />
        <Route path='programs/studyskills/*' element={<StudySkillsPage />} />
        <Route path='programs/vocabulary/*' element={<VocabularyPage />} />
        <Route path='programs/writersmark/*' element={<WritersMarkPage />} />
        <Route path='programs/writing/*' element={<WritingPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
