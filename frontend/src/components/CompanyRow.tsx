import React, {useState} from "react";
import styled from "styled-components";
import {Card} from "./Card";
import {LightButton} from "./LightButton";

const Column = styled.div`
          display: flex;
          flex-flow: column;
          flex: 1;
        `;

const Row = styled.div`
          display: flex;
          flex-flow: row;
          align-items: baseline;

          & h4 {
            min-width: 90px;
          }
        `;

const Circle = styled.div`
          background: var(--momstertech-grey-bg-theme);
          border-radius: 1000px;
          height: 80px;
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 50px;
        `;

export const CompanyRow: React.FC<{
    company: any,
}> = ({company}) => {
    const [isSelected, setIsSelected] = useState(false);

    return <div style={{display: 'flex', gap: '20px', marginBottom: '10px'}}>
        <Card style={{
            flex: '0.2',
            flexFlow: 'column',
            alignItems: 'center',
            padding: '20px',
            minWidth: '80px',
            marginBottom: '10px',
            background: isSelected ? '#d5d5d5' : '#ffffff'
        }}>
            <h3>{company.name}</h3>
            <LightButton onClick={() => console.log('test')} >
                {!isSelected ? 'Choose' : 'Reset'}
            </LightButton>
        </Card>
        <Card style={{
            flex: '0.9',
            gap: '20px',
            alignItems: 'center',
            padding: '20px',
            marginBottom: '10px',
            background: isSelected ? '#d5d5d5' : '#ffffff'
        }}>
            <Column>
                <Row><h4>Status</h4><h6>{company.status}</h6></Row>
                <Row><h4>Deadline</h4><h6>{company.deadline}</h6></Row>
            </Column>
            <Column>
                <Row><h4>Type</h4><h6>{company.type}</h6></Row>
                <Row><h4>ERP</h4><h6>{company.erp}</h6></Row>
            </Column>
            <Circle
                style={{background: true ? "#A9D5A9" : "#DA8B8B"}}>
                {true ? <i className="bi bi-check-lg"/> :
                    <i className="bi bi-exclamation-lg"/>}
            </Circle>
        </Card>
    </div>
}