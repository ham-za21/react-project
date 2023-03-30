
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function App() {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  
  const availableSchemas = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ].filter(schema => !selectedSchemas.includes(schema.value));

  const [open, setOpen] = useState(false);

  const handleSaveSegment = () => {    
    const segmentSchema = selectedSchemas.map(schema => {
      return {
        [schema]: availableSchemas.find(s => s.value === schema).label
      };
    });
    
    const data = {
      segment_name: segmentName,
      schema: segmentSchema
    };

    console.log(data);
  };

  const handleAddNewSchema = () => {
    if (newSchema !== '') {     
      setSelectedSchemas([...selectedSchemas, newSchema]);      
      setNewSchema('');
    }
  };

  return (
    <div className="container">
      <button onClick={() => setOpen(true)}>Save segment</button>
      <Popup open={open} onClose={() => setOpen(false)}>
        <div>
          <h2>Save Segment</h2><br/>
          <label htmlFor="segmentName">Enter the Name of the Segment</label><br/>
          <input type="text" id="segmentName" placeholder='Name of the segment' onChange={(e) => setSegmentName(e.target.value)} value={segmentName} /><br/>
          <select>
            {availableSchemas.map(schema => (
              <option key={schema.value} value={schema.value}>{schema.label}</option>
            ))}
          </select> 
          <br />
          {selectedSchemas.map(schema => (
            <select key={schema} value={schema} onChange={(e) => setSelectedSchemas(selectedSchemas.map(s => s === schema ? e.target.value : s))}>
              <option value="">Select schema</option>
              {availableSchemas.map(schema => (
                <option key={schema.value} value={schema.value}>{schema.label}</option>
              ))}
            </select>
          ))}
          <br />
          <input type="text" value={newSchema} onChange={(e) => setNewSchema(e.target.value)} /><br/>
          <button onClick={handleAddNewSchema}>+ Add new schema</button><br/>
          <button onClick={handleSaveSegment}>Save the segment</button>
          <button className='btn'  onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </Popup>
    </div>
  );
}

export default App;


