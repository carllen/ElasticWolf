var ew_DeregisterInstances = {
    ew_session : null,
    retVal : null,
    loadbalancer : null,
    launch : function() {
        this.retVal.LoadBalancerName = document.getElementById("ew.deregisterlb.LoadBalancerName").value.trim();
    var listBox = document.getElementById('Deregister_Instances');
    var idx = 0;
    var nRowCount = listBox.getRowCount();

    this.retVal.Instances = "";
    for(idx=0;idx < nRowCount;idx++)
    {
        var cellID = "cellcheck"+idx;
        var cell = document.getElementById(cellID);

        if(cell.hasAttribute('checked','true'))
        {
        var cellinstance = "Instanceid"+idx;

        var instance = document.getElementById(cellinstance);

        var reginstanceid = instance.getAttribute('label');

        this.retVal.Instances =  this.retVal.Instances + reginstanceid +",";
        }
    }
    this.retVal.ok = true;
        return true;
    },
    init : function() {
        this.ew_session = window.arguments[0];
        this.retVal = window.arguments[1];
    this.loadbalancer = window.arguments[2];
    var loadbalancer = window.arguments[2];
    var loadbalancername = loadbalancer.LoadBalancerName;
    var registerdinstance = loadbalancer.InstanceId;

    document.getElementById("ew.deregisterlb.LoadBalancerName").value = loadbalancer.LoadBalancerName;
    var configureInstances = document.getElementById('Deregister_Instances');

        var Idx = 0;
    var Instancedetails = this.ew_session.model.getInstances();

    var registerid = new Array();

        var instanceid = new String(registerdinstance);

    var tempArray = new Array();
    tempArray = instanceid.split(",");

    for(var a=0;a<tempArray.length;a++)
    {
        registerid.push(tempArray[a]);
    }

    for (var i in Instancedetails) {
        regfound = false;
        for(var a=0;a<registerid.length;a++)
        {
        var id = registerid[a];
        if(Instancedetails[i].id == id)
        {
            regfound = true;
            break;
        }
        }
        if(regfound == false){
            continue;
        }
        var row = document.createElement('listitem');
        var cell1 = document.createElement('listcell');
        var cell2 = document.createElement('listcell');
        var cell3 = document.createElement('listcell');
        var cell4 = document.createElement('listcell');
        var cell5 = document.createElement('listcell');

        var cellID = "cellcheck"+Idx;

        var cellInstanceId = "Instanceid"+Idx;

        cell1.setAttribute('type', 'checkbox');
        cell1.setAttribute('id',cellID);
        row.appendChild(cell1);

        cell2.setAttribute('label', Instancedetails[i].id);
        cell2.setAttribute('id',cellInstanceId);
        row.appendChild(cell2);

        cell3.setAttribute('label', Instancedetails[i].state);
        row.appendChild(cell3);

        cell4.setAttribute('label', Instancedetails[i].availabilityZone);
        row.appendChild(cell4);

        cell5.setAttribute('label', Instancedetails[i].name);
        row.appendChild(cell5);

        var rowID = "row"+Idx;
        row.setAttribute('id',rowID);
        configureInstances.appendChild(row);
        Idx = Idx +1;
    }
  },
  enable_disableInstances : function(){
      var loadbalancer = window.arguments[2];
      var listBox = document.getElementById('Deregister_Instances');
      var selectedItem = listBox.currentIndex;
      if (selectedItem == -1) return null;
      var rowID = "row"+selectedItem;
      var row = document.getElementById(rowID);
      var cellID = "cellcheck"+selectedItem;
      var cell = document.getElementById(cellID);
      var attribute = cell.getAttribute('type');
      if(cell.hasAttribute('checked','true'))
      {
          cell.setAttribute('checked','false');
          cell.removeAttribute('checked');
      }else{
          cell.setAttribute('checked','true');
          this.ew_session.modal.getInstances();
      }
  }


}
