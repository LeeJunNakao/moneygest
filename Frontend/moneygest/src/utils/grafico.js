/*
Voce deve instanciar a Classe informando o json com dados (deve haver a chave 'name' e 'value'),
o elemento da DOM do html que será o container e por fim o titulo.

Exemplo:

new Chart(data,'500','#container','ATIVOS');
*/

class Chart{
    constructor(data=null,size,elementDOM,chartTitle){
        this.data = data;
        this.size = size;
        this.executeChartCreation(elementDOM,chartTitle);
    }

    createContainer(elementDOM){
        const element = document.querySelector(elementDOM)
        this.container = document.createElement('div');
        this.container.className="piechart-container";
        this.container.style.maxWidth = `${this.size}px`;
        element.appendChild(this.container);
    }

    createContainerTitle(chartTitle){
        this.title = document.createElement('div');
        this.title.className="piechart-title";
        this.title.style.fontSize=`${this.size/20}px`;
        this.title.height = `${this.size/10}px`;
        this.title.style.lineHeight = this.title.height;
        this.title.innerHTML=chartTitle;
        this.container.appendChild(this.title)
    }

    createContentContainer(){
        this.contentContainer = document.createElement('div');
        this.contentContainer.className="content-container";
        this.container.appendChild(this.contentContainer);
    }

    createContainerCaption(){
        this.captionBox = document.createElement('div');
        this.captionBox.className="piechart-captionBox";
        this.contentContainer.appendChild(this.captionBox);
    }

    executeChartCreation(elementDOM,chartTitle){
        this.createContainer(elementDOM);
        this.createContainerTitle(chartTitle);
        this.createContentContainer();
        this.setScreen();
        this.createContainerCaption();
        this.calculateTotalValue();
        this.calculateEachElementProportion();
        this.drawChart()
    }

    calculateTotalValue(){
        let subTotal=0;
        this.data.forEach(element=>{
            subTotal += element.value
        })
        this.totalValue=subTotal;
    }

    calculateEachElementProportion(){
        this.data.forEach(element=>{
            element.proportion = 2*Math.PI*element.value/this.totalValue;
        })
    }
    
    chooseColor(numberColor){
        let palletColor = ['#beebe9','#c81912','#ededed','#75b79e','#dab8f3','#ffa41b',
            '#ffc2c2','#698474','#42e6a4','#381460','#f1fa3c'];
        if(numberColor<=10){
            return palletColor[numberColor]
        }else{
            let modulus = numberColor % 11
            return palletColor[modulus]
        }
    }

    drawChart(){
        let position = 0;
        let color = 0;
        this.data.forEach(element=>{
            this.createSlice(this.size/5,position,(position+element.proportion),this.chooseColor(color));
            this.insertCaption(this.chooseColor(color),element.name,element.value,(element.proportion/2/Math.PI))
            position+=element.proportion;
            color+=1;

        })
    }
    
    setScreen(){
        let canvasContainer = document.createElement('div');
        canvasContainer.className="canvas-container";
        this.screen = document.createElement('canvas');
        this.screen.width = this.size/2;
        this.screen.height = this.size/2;   
        canvasContainer.appendChild(this.screen)
        this.contentContainer.appendChild(canvasContainer);     
        this.canvas = this.screen.getContext('2d');
    }

    insertCaption(color,name,value,porcent){
        const captionLine = document.createElement('div');
        captionLine.className="caption-line";
        this.captionBox.appendChild(captionLine);

        const colorBox = document.createElement('div');
        colorBox.className = 'colorbox';
        colorBox.style.background=color;
        captionLine.appendChild(colorBox);

        const nameBox = document.createElement('div');
        nameBox.className="namebox";
        nameBox.innerHTML=`${name} - `;
        captionLine.appendChild(nameBox);

        const valuesBox = document.createElement('div');
        valuesBox.className="valuesbox";
        valuesBox.innerHTML=`R$ ${value.toFixed(2)} (${(porcent*100).toFixed(2)}%)`
        captionLine.appendChild(valuesBox);
    }

    createSlice(radius,openingAngle,closingAngle,color){
        this.canvas.beginPath();
        this.canvas.moveTo(this.size/4,this.size/4)
        this.canvas.fillStyle = color;
        this.canvas.strokeStyle = 'white';
        this.canvas.lineWidth=2;
        this.canvas.arc(this.size/4,this.size/4,radius,openingAngle,closingAngle,false);
        this.canvas.lineTo(this.size/4,this.size/4)
        this.canvas.fill()
        this.canvas.stroke();
        this.canvas.closePath();
    }
}

module.exports = Chart;