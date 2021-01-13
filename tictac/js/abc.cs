class DeiselPump : IPetrolPump {
    string getPetrol(){
        return 'here is the petrol';
        
    }
}

public interface IPetrolPump{
    string getPetrol();
}

class car{
    private string pertrol;
    car(IPetrolPump pp){
        this.petrol = pp.getPetrol();
    }
}

car c = new car(new DeiselPump());