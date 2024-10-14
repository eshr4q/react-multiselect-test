import './App.css';
import MultiSelect from './Multiselect';

function App() {
 const defaultOptions = ['Linda Ashley', 'Tiffany Arnold'];

  return (
    <div className="App">
        <h1>React Multi-Select Component</h1>

            <MultiSelect defaultOptions={defaultOptions} />
            
    </div>
  );
}

export default App;