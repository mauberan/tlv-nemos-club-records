var board_state = 0;
var last_board_state = null;

//definitions of entire board --> copied to each board state for its own use

//consts
var allDistances = [50,100,200,400,800,1500];
var allGenders = ['M','F'];
var allCourses = [25,50]; //to add open water
var allStrokes = ['Free','Breast','Back','FLY','IM'];
var allAgeGroups = [0,21,30,35,40,45,50,55,60,65];
var IMrelaysStrokes = ['BS','BRS','FLY','FS'];

//derived on startup
var allSwimmers = [];
var allEvents = [];


//states
var speedState = {
    buttonOptName: {
        "stroke": [],
        "distance": [],
        "ageGroup": [],
        "gender":[],
        "course":[]
    },

    tableCaptions: function () {
        return [
            {caption: '#',sty: 'tableCell-indexCell-caption'},

            {caption: 'Name',sty: 'tableCell-name-caption'},
            {caption: 'Stroke',sty: 'tableCell-stroke'},
            {caption: 'Length',sty: 'tableCell-distance'},
            {caption: 'Time',sty: 'tableCell-time'},
            {caption: 'Event',sty: 'tableCell-eventName-caption'},
            {caption: 'Course',sty: 'tableCell-eventCourse'},
            {caption: 'Location',sty: 'tableCell-location'},
            {caption: 'Date',sty: 'tableCell-date'},
            {caption: 'Rank in A.G',sty: 'tableCell-rank-caption'},
            {caption: 'Points',sty: 'tableCell-rank-caption'},
            {caption: ' ',sty: 'tableCell-plus-off'},
        ]
    },

    caption: function () {
        return "Club Records";
    },
    query: function() {
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_speed_query', arguments: [speedState.stroke,
                speedState.distance,
                speedState.ageGroup,
                speedState.gender,
                speedState.course]},

            //scid,swid,eid,swimmerFirstName,swimmerLastName,swimmerGender,swimmerByear,
            //stroke,distance,time,points,rankInAgeGroup,eventName,location,course,date,splits

            success: function (obj, textstatus) {
                var ret = [];
                var out ='';

                if (!('error' in obj)) {
                    yourVariable = obj.result;

                    if (obj.result != null) {

                        for (i = 0,max=obj.result.length; i < max; i++) {
                            // console.log(obj.result[i]);
                            element = obj.result[i];
                            new_score = new scoreItem(element.scid, element.swid, element.eid, element.firstname, element.lastname, element.gender, element.byear, element.stroke, element.distance, element.time, element.points,element.age_group, element.rank_in_ag, element.name, element.location, element.course, element.date, element.splits);
                            ret.push(new_score);
                        }
                        document.getElementById('page').appendChild(buildTableCaptions());

                        document.getElementById('page').appendChild(buildResultTable(ret,document.getElementById('speed')));


                    }
                    else {
                        no_results = document.createElement('div');
                        no_results.setAttribute('class', 'tableMain');
                        no_results.innerHTML = 'No Results';
                        document.getElementById('page').appendChild(no_results);
                    }


                }
                else {

                    // console.log(obj.error);
                }

            }
        });


    },
    // buildHeader: function() {
    //     stateStats(speedState);
    // },
};
var relaysState = {
    buttonOptName: {
        "stroke": ['Free','IM'],
        "distance": ['4 X 50', '4 X 100', '4 X 200'],
        "ageGroup": ["Club Record",'100-119', '120–159',"160–199",'200–239','240–279','280–319'],
        "course": [25,50],
        "gender": ["M","F","MIX"],
    },

    tableCaptions: function () {
        return [
            {caption: '#',sty: 'tableCell-indexCell-relays-caption'},
            {caption: 'Names',sty: 'tableCell-name-caption'},
            {caption: 'Stroke',sty: 'tableCell-stroke'},
            {caption: 'Length',sty: 'tableCell-distance'},
            {caption: 'Time',sty: 'tableCell-time'},
            {caption: 'Event',sty: 'tableCell-eventName-caption'},
            {caption: 'Course',sty: 'tableCell-eventCourse'},
            {caption: 'Location',sty: 'tableCell-location'},
            {caption: 'Date',sty: 'tableCell-date'},
            {caption: 'Rank in A.G',sty: 'tableCell-rank-caption'},
            {caption: 'Points',sty: 'tableCell-rank-caption'},
            {caption: ' ',sty: 'tableCell-plus-off'},
        ]
    },

    caption: function() {
        return "Fastest Relays";
    },
    query: function() {
        // console.log(this);
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',

            // $stroke,$distance, $course, $ageGroup, $gender
            data: {functionname: 'get_relays_query', arguments: [relaysState.stroke,
                relaysState.distance,
                relaysState.course,
                relaysState.ageGroup,
                relaysState.gender]},



            success: function (obj, textstatus) {
                var ret = [];
                var out ='';

                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    // console.log(obj.result);
                    if (obj.result != null) {
//rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits
                        for (i = 0,max=obj.result.length; i < max; i++) {
                            // console.log(obj.result[i]);
                            element = obj.result[i];
                            new_score = new relayScoreItem(element.rscid, element.eid, element.stroke, element.distance, element.swid1, element.swid2, element.swid3, element.swid4, element.time, element.age_group, element.rank_in_ag, element.points, element.location, element.date, element.course, element.gender, element.splits);
                            ret.push(new_score);
                        }
                        document.getElementById('page').appendChild(buildTableCaptions());

                        table = buildResultTable(ret,document.getElementById('relays'));
                        document.getElementById('page').appendChild(table);                        // console.log(obj.result);

                    }
                    else {
                        no_results = document.createElement('div');
                        no_results.setAttribute('class', 'tableMain');
                        no_results.innerHTML = 'No Results';
                        document.getElementById('page').appendChild(no_results);
                    }


                }
                else {

                    // console.log(obj.error);
                }

            }
        });



    },



};
var swimmerState = {
    buttonOptName: {
        "swimmerName": [],
        "prev": ['Prev'],

        "next": ['Next'],
        "swimmerCriteria": ['Event','Stroke','Course','Rank'],
    },
    caption: function() {

        return this.swimmerName;
    },

    tableCaptions: function () {
        return [
            {caption: 'Stroke',sty: 'tableCell-stroke'},
            {caption: 'Length',sty: 'tableCell-distance'},
            {caption: 'Time',sty: 'tableCell-time'},
            {caption: 'Event',sty: 'tableCell-eventName-caption'},
            {caption: 'Course',sty: 'tableCell-eventCourse'},
            {caption: 'Location',sty: 'tableCell-location'},
            {caption: 'Date',sty: 'tableCell-date'},
            {caption: 'Rank in A.G',sty: 'tableCell-rank-caption'},
            {caption: 'Points',sty: 'tableCell-rank-caption'},
            {caption: ' ',sty: 'tableCell-plus-off'},
        ]
    },



    query : function() {

        var noResults = 1;
        var page = document.getElementById('page');

        swimmerId = getSwimmerIdByName(swimmerState.swimmerName);
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_swimmer_query', arguments: [swimmerId, swimmerState.swimmerCriteria]},

            success: function (obj, textstatus) {
                var ret = [];
                var out = '';


                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    if (obj.result != null) {
                        yourVariable.forEach(function (element) {
                            new_score = new scoreItem(element.scid, element.swid, element.eid, element.firstname, element.lastname, element.gender, element.byear, element.stroke, element.distance, element.time, element.points,element.age_group, element.rank_in_ag, element.name, element.location, element.course, element.date, element.splits);
                            ret.push(new_score);
                        });


                        page.appendChild(buildTableCaptions());

                        table = buildResultTable(ret);
                        page.appendChild(table);
                        noResults = 0;

                    }
                    else {
                        // console.log(obj.error);
                    }
                }
                jQuery.ajax({
                    type: "POST",
                    url: 'nemos_main.php',
                    dataType: 'json',


                    data: {functionname: 'get_swimmer_relays_query', arguments: [swimmerId,swimmerState.swimmerCriteria]},

                    success: function (obj, textstatus) {
                        var ret = [];
                        var out = '';


                        if (!('error' in obj)) {
                            yourVariable = obj.result;
                            // console.log(obj.result);
                            if (obj.result != null) {
//rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits
                                for (i = 0,max=obj.result.length; i < max; i++) {
                                    // console.log(obj.result[i]);
                                    element = obj.result[i];
                                    new_score = new relayScoreItem(element.rscid, element.eid, element.stroke, element.distance, element.swid1, element.swid2, element.swid3, element.swid4, element.time, element.age_group, element.rank_in_ag, element.points, element.location, element.date, element.course, element.gender, element.splits);
                                    ret.push(new_score);
                                }
                                table = buildResultTable(ret,document.getElementById('swimmer'));
                                var separator = document.createElement('div');
                                separator.setAttribute('class','table-separator');
                                separator.innerHTML = "Relays";
                                page.appendChild(separator);
                                page.appendChild(table);                        // console.log(obj.result);

                            }
                            else {
                                if (noResults) {
                                    no_results = document.createElement('div');
                                    no_results.setAttribute('class', 'tableMain');
                                    no_results.innerHTML = 'No Results';
                                    document.getElementById('page').appendChild(no_results);
                                }
                            }


                        }
                        else {

                            // console.log(obj.error);
                        }

                    }
                });
            }
        });
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_swimmer_query_by_stroke', arguments: [swimmerId, swimmerState.swimmerCriteria]},

            success: function (obj, textstatus) {
                var ret = [];
                var out = '';


                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    console.log(yourVariable);
                    // if (obj.result != null) {
                    //     yourVariable.forEach(function (element) {
                    //         new_score = new scoreItem(element.scid, element.swid, element.eid, element.firstname, element.lastname, element.gender, element.byear, element.stroke, element.distance, element.time, element.points, element.age_group, element.rank_in_ag, element.name, element.location, element.course, element.date, element.splits);
                    //         ret.push(new_score);
                    //     });
                    //
                    //
                    //     page.appendChild(buildTableCaptions());
                    //
                    //     table = buildResultTable(ret);
                    //     page.appendChild(table);
                    //     noResults = 0;
                    //
                    // }
                    // else {
                    //     // console.log(obj.error);
                    // }
                }
            }
        });
    },


};
var eventState = {
    buttonOptName: {
        "eventName": [],

        "prev": ['Prev'],
        "next": ['Next'],
        "eventCriteria":  ['Stroke','Swimmer','Age Group','Rank'],
    },
    caption: function() { return this.eventName; },

    tableCaptions: function () {
        return [
            {caption: 'Name',sty: 'tableCell-name-caption'},
            {caption: 'Stroke',sty: 'tableCell-stroke'},
            {caption: 'Length',sty: 'tableCell-distance'},
            {caption: 'Time',sty: 'tableCell-time'},
            {caption: 'Course',sty: 'tableCell-eventCourse'},
            {caption: 'Rank in A.G',sty: 'tableCell-rank-caption'},
            {caption: 'Points',sty: 'tableCell-rank-caption'},
            {caption: ' ',sty: 'tableCell-plus-off'},
        ]
    },
    query : function() {
        eid = getEventIdByName(eventState.eventName);

        var noResults = 1;
        document.getElementById('page').innerHTML = '';
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_event_query', arguments: [eid, eventState.eventCriteria]},
            success: function (obj, textstatus) {
                var ret = [];

                if (!('error' in obj)) {
                    if (obj.result != null) {

                        yourVariable = obj.result;
                        yourVariable.forEach(function (element) {
                            new_score = new scoreItem(element.scid, element.swid, element.eid, element.firstname, element.lastname, element.gender, element.byear, element.stroke, element.distance, element.time, element.points,element.age_group, element.rank_in_ag, element.name, element.location, element.course, element.date, element.splits);
                            ret.push(new_score);
                        });
                        document.getElementById('page').appendChild(buildTableCaptions());


                        table = buildResultTable(ret);
                        document.getElementById('page').appendChild(table);
                        noResults = 0;

                    }else {

                    }
                    jQuery.ajax({
                        type: "POST",
                        url: 'nemos_main.php',
                        dataType: 'json',


                        data: {functionname: 'get_event_relays_query', arguments: [eid,eventState.eventCriteria]},

                        success: function (obj, textstatus) {
                            var ret = [];
                            var out = '';


                            if (!('error' in obj)) {
                                yourVariable = obj.result;
                                // console.log(obj.result);
                                if (obj.result != null) {
//rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits
                                    for (i = 0,max=obj.result.length; i < max; i++) {
                                        // console.log(obj.result[i]);
                                        element = obj.result[i];
                                        new_score = new relayScoreItem(element.rscid, element.eid, element.stroke, element.distance, element.swid1, element.swid2, element.swid3, element.swid4, element.time, element.age_group, element.rank_in_ag, element.points, element.location, element.date, element.course, element.gender, element.splits);
                                        ret.push(new_score);
                                    }
                                    table = buildResultTable(ret,document.getElementById('swimmer'));
                                    var separator = document.createElement('div');
                                    separator.setAttribute('class','table-separator');
                                    separator.innerHTML = "Relays";
                                    document.getElementById('page').appendChild(separator);
                                    document.getElementById('page').appendChild(table);                        // console.log(obj.result);
                                    noResults = 0;
                                }
                                else {
                                    if (noResults) {
                                        no_results = document.createElement('div');
                                        no_results.setAttribute('class', 'tableMain');
                                        no_results.innerHTML = 'No Results';
                                        document.getElementById('page').appendChild(no_results);
                                    }
                                }


                            }
                            else {

                                // console.log(obj.error);
                            }

                        }
                    });
                }
                else {
                    // console.log(obj.error);
                }

            }
        });

    },


};
var allScoresState = {
    buttonOptName: {
        "allScoresCriteria": ['Stroke','Course','Rank','Age Group'],
    },
    caption: function() { return "All Scores";},

    query : function() {
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_all_results_query', arguments: [allScoresState.allScoresCriteria]},

            success: function (obj, textstatus) {
                var ret = [];
                var out ='';

                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    yourVariable.forEach(function (element){
                        new_score = new scoreItem(element.scid,element.swid,element.eid,element.firstname,element.lastname,element.gender,element.byear,element.stroke,element.distance,element.time,element.points,element.age_group,element.rank_in_ag,element.name,element.location,element.course,element.date,element.splits);
                        ret.push(new_score);
                    });
                    var page = document.getElementById('page');


                    page.appendChild(buildTableCaptions());

                    table = buildResultTable(ret,document.getElementById('all'));
                    page.appendChild(table);
                    noResults = 0;
                    jQuery.ajax({
                        type: "POST",
                        url: 'nemos_main.php',
                        dataType: 'json',


                        data: {functionname: 'get_all_relays_results_query', arguments: [allScoresState.allScoresCriteria]},

                        success: function (obj, textstatus) {
                            var ret = [];
                            var out = '';


                            if (!('error' in obj)) {
                                yourVariable = obj.result;
                                // console.log(obj.result);
                                if (obj.result != null) {
//rscid,events.eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, events.location, events.date,events.course,gender,splits
                                    for (i = 0,max=obj.result.length; i < max; i++) {
                                        // console.log(obj.result[i]);
                                        element = obj.result[i];
                                        new_score = new relayScoreItem(element.rscid, element.eid, element.stroke, element.distance, element.swid1, element.swid2, element.swid3, element.swid4, element.time, element.age_group, element.rank_in_ag, element.points, element.location, element.date, element.course, element.gender, element.splits);
                                        ret.push(new_score);
                                    }
                                    table = buildResultTable(ret,document.getElementById('swimmer'));
                                    var separator = document.createElement('div');
                                    separator.setAttribute('class','table-separator');
                                    separator.innerHTML = "Relays";
                                    document.getElementById('page').appendChild(separator);
                                    document.getElementById('page').appendChild(table);                        // console.log(obj.result);

                                }
                                else {
                                    if (noResults) {
                                        no_results = document.createElement('div');
                                        no_results.setAttribute('class', 'tableMain');
                                        no_results.innerHTML = 'No Results';
                                        document.getElementById('page').appendChild(no_results);
                                    }
                                }


                            }
                            else {

                                // console.log(obj.error);
                            }

                        }
                    });
                }
                else {
                    // console.log(obj.error);
                }
            }
        });
    },
    tableCaptions: function () {
        return [
            {caption: 'Name',sty: 'tableCell-name-caption'},
            {caption: 'Stroke',sty: 'tableCell-stroke'},
            {caption: 'Length',sty: 'tableCell-distance'},
            {caption: 'Time',sty: 'tableCell-time'},
            {caption: 'Event',sty: 'tableCell-eventName-caption'},
            {caption: 'Course',sty: 'tableCell-eventCourse'},
            {caption: 'Location',sty: 'tableCell-location'},
            {caption: 'Date',sty: 'tableCell-date'},
            {caption: 'Rank in A.G',sty: 'tableCell-rank-caption'},
            {caption: 'Points',sty: 'tableCell-rank-caption'},
            {caption: ' ',sty: 'tableCell-plus-off'},
        ]
    },
};

var aboutState = {
    buttonOptName: {},
    caption: function() {
        return 'About';
    },
    query: function() {}
};

function scoreItem(scid,swid,eid,swimmerFirstName,swimmerLastName,swimmerGender,swimmerByear,
                   stroke,distance,time,points,ageGroup,rankInAgeGroup,eventName,location,course,date,splits) {

    this.scid = scid;
    this.swid = swid;
    this.eid = eid;
    this.swimmerFirstName = swimmerFirstName;
    this.swimmerLastName = swimmerLastName;
    this.swimmerGender = swimmerGender;
    this.swimmerByear = swimmerByear;
    this.stroke = stroke;
    this.distance = distance;
    this.time = time;
    this.points = points;
    this.eventName = eventName;
    this.location = location;
    this.course = course;
    this.date = date;
    this.rankInAgeGroup = rankInAgeGroup;
    this.splits = splits;
    this.ageGroup = ageGroup;

    this.toArray = function() {
        ret = [];
        for (key in this) {
            if (key != 'toArray' && key != 'scoreItem' && key != 'toLine' && key != 'toSpeedTable' && key!= 'toSwimmerTable')

                ret.push(this[key]);
        }
        return ret;
    };


    this.toSpeedTable = function() {
        ret = [];
        ret.push(this.swimmerFirstName + ' ' + this.swimmerLastName);
        ret.push(this.stroke);
        ret.push(this.distance);
        ret.push(this.time);
        ret.push(this.eventName);
        ret.push(this.location);
        ret.push(this.date);
        ret.push(this.rankInAgeGroup);
        ret.push(this.splits);
        return ret;
    };

    this.toLine = function() {
        ret = '';
        for (key in this) {
            if (key != 'toArray' && key != 'scoreItem' && key != 'toLine' && key != 'toSpeedTable' && key!= 'toSwimmerTable')
                ret += key + ": " + this[key] + ' || ';
        }
        return ret;
    }

    this.toSwimmerTable = function() {
        ret = [];
        ret.push(this.swimmerFirstName + ' ' + this.swimmerLastName);
        ret.push(this.stroke);
        ret.push(this.distance);
        ret.push(this.time);
        ret.push(this.eventName);
        ret.push(this.location);
        ret.push(this.date);
        ret.push(this.rankInAgeGroup);
        ret.push(this.splits);


        return ret;
    }

    this.display = function() {


        var score_div = document.createElement('div');
        var first_row = document.createElement('div');

        first_row.setAttribute('class', 'tableRow');


        var indexCell = document.createElement('div');
        indexCell.setAttribute('class', 'tableCell-indexCell');
        first_row.appendChild(indexCell);

        var name = document.createElement('div');
        name.setAttribute('class', 'tableCell-name');
        name.innerHTML = this.swimmerFirstName + ' ' + this.swimmerLastName;
        first_row.appendChild(name);
        name.addEventListener('click', function() {
            gotoSwimmer(this.innerHTML);
        });

        var stroke = document.createElement('div');
        stroke.setAttribute('class', 'tableCell-stroke');
        stroke.innerHTML = this.stroke;
        first_row.appendChild(stroke);


        var distance = document.createElement('div');
        distance.setAttribute('class', 'tableCell-distance');
        distance.innerHTML = this.distance;
        first_row.appendChild(distance);


        var time = document.createElement('div');
        time.setAttribute('class', 'tableCell-time');
        time.innerHTML = timeToString(stringToTime(this.time));
        first_row.appendChild(time);


        var plus = document.createElement('div');
        plus.setAttribute('class', 'tableCell-plus-off');
        plus.innerHTML = '+';


        var eventName = document.createElement('div');
        eventName.setAttribute('class', 'tableCell-eventName');
        eventName.innerHTML = this.eventName;
        first_row.appendChild(eventName);
        eventName.addEventListener('click', function() {
            gotoEvent(this.innerHTML);
        });

        var eventCourse = document.createElement('div');
        eventCourse.setAttribute('class', 'tableCell-eventCourse');
        eventCourse.innerHTML = this.course + 'M';
        first_row.appendChild(eventCourse);

        var location = document.createElement('div');
        location.setAttribute('class', 'tableCell-location');
        location.innerHTML = this.location;
        first_row.appendChild(location);


        var date = document.createElement('div');
        date.setAttribute('class', 'tableCell-date');
        date.innerHTML = dateFormatter(this.date);
        first_row.appendChild(date);


        var rank = document.createElement('div');
        rank.setAttribute('class', 'tableCell-rank');
        if (this.rankInAgeGroup > 3 || this.rankInAgeGroup == 0) {
            rank.innerHTML = this.rankInAgeGroup;
        } else {
            medal = document.createElement('img');
            medal.setAttribute('width', '20px');
            medal.setAttribute('height', '20px');
            rank.appendChild(medal);
            if (this.rankInAgeGroup == 1) {
                medal.src = 'css/gold.svg';

            }
            if (this.rankInAgeGroup == 2) {
                medal.src = 'css/silver.svg';

            }
            if (this.rankInAgeGroup == 3) {
                medal.src = 'css/bronze.svg';

            }


        }
        first_row.appendChild(rank);

        var points = document.createElement('div');
        points.setAttribute('class', 'tableCell-rank');
        points.innerHTML = this.points;
        first_row.appendChild(points);
        first_row.appendChild(plus);


        score_div.appendChild(first_row);

        if (this.scid === '45') {
            // // splitsDisplay();
            // console.log(this.parseSplits());
            // console.log(this.stroke, this.distance);

        }

        var splits_row = document.createElement('div');
        splits_row.setAttribute('class', 'splits-row');

        age_group_caption = document.createElement('div');
        age_group_caption.setAttribute('class', 'split-ag-caption');
        age_group_caption.innerHTML = 'Age Group:';

        age_group_value = document.createElement('div');
        age_group_value.setAttribute('class', 'split-ag-value');
        age_group_value.innerHTML = setAgeGroupString(this.ageGroup);

        reaction_time_caption = document.createElement('div');
        reaction_time_caption.setAttribute('class', 'splits-reaction-caption');
        reaction_time_caption.innerHTML = 'Reaction time:';
        splits_row.appendChild(reaction_time_caption);

        reaction_time_value = document.createElement('div');
        reaction_time_value.setAttribute('class', 'splits-reaction-value');
        reaction_time_value.innerHTML = '-';
        splits_row.appendChild(reaction_time_value);

        splits_table = document.createElement('div');
        splits_table.setAttribute('class','splits-table-row');

        splits_table_row = document.createElement('div');
        splits_table_row.setAttribute('class','splits-table-row');

        parsed_splits = this.parseSplits();
        // console.log(this.scid,parsed_splits);

        for (var i = 0; i < parsed_splits[0].length; i++) {
            split_block  = document.createElement('div');
            split_block.setAttribute('class','split-block');



            split_distance = document.createElement('div');
            split_distance.setAttribute('class','split-distance');
            split_distance.innerHTML = parsed_splits[0][i] + 'M';
            split_block.appendChild(split_distance);


            split_tick = document.createElement('div');
            split_tick.setAttribute('class','split-tick');
            split_tick.innerHTML = parsed_splits[1][i];
            split_block.appendChild(split_tick);
            if (i === parsed_splits[0].length - 1) {

                split_tick.setAttribute('class','split-tick-final');

            }


            split_50_cut = document.createElement('div');
            split_50_cut.setAttribute('class','split-50-cut');
            if (parsed_splits[2][i] !== -1) {
                split_50_cut.innerHTML = parsed_splits[2][i];
            }
            split_block.appendChild(split_50_cut);

            split_100_cut = document.createElement('div');
            split_100_cut.setAttribute('class','split-100-cut');
            if (parsed_splits[3][i] !== -1) {
                split_100_cut.innerHTML = parsed_splits[3][i];
            }
            split_block.appendChild(split_100_cut);

            splits_table.appendChild(split_block);

        }
        var third_block = document.createElement('div');
        third_block.setAttribute('class','third-line');

        var avg_50_caption = document.createElement('div');
        avg_50_caption.setAttribute('class','splits-avg-50-caption');
        avg_50_caption.innerHTML = 'Average 50M:';
        var avg_50_value = document.createElement('div');
        avg_50_value.setAttribute('class','splits-avg-50-value');
        avg_50_value.innerHTML = parsed_splits[4].toString();

        var avg_100_caption = document.createElement('div');
        avg_100_caption.setAttribute('class','splits-avg-100-caption');
        avg_100_caption.innerHTML = 'Average 100M:';

        var avg_100_value = document.createElement('div');
        avg_100_value.setAttribute('class','splits-avg-100-value');
        avg_100_value.innerHTML = parsed_splits[5];


        var second_block = document.createElement('div');
        second_block.setAttribute('class','third-line');
        second_block.appendChild(age_group_caption);
        second_block.appendChild(age_group_value);

        second_block.appendChild(reaction_time_caption);
        second_block.appendChild(reaction_time_value);


        third_block.appendChild(avg_50_caption);
        third_block.appendChild(avg_50_value);
        third_block.appendChild(avg_100_caption);
        third_block.appendChild(avg_100_value);

        splits_row.appendChild(splits_table);
        splits_row.appendChild(second_block);
        splits_row.appendChild(third_block);

        score_div.appendChild(splits_row);

        plus.setAttribute('class', 'tableCell-plus-active');
        plus.addEventListener('click', function () {
            $(splits_row).slideToggle('fast');
            if (score_div.className === 'tableRow-selected') {
                score_div.setAttribute('class', 'tableRow');
                plus.innerHTML = '+';
            }
            else {
                score_div.setAttribute('class', 'tableRow-selected');
                plus.innerHTML = '-';
            }
        });



        // console.log(board_state.id);
        switch (board_state.id) {
            case 'speed':
                break;

            case 'swimmer':
                first_row.removeChild(name);
                first_row.removeChild(indexCell);
                break;
            case 'all':
                first_row.removeChild(indexCell);
                break;
            case 'event':
                first_row.removeChild(location);
                first_row.removeChild(date);
                first_row.removeChild(eventName);
                first_row.removeChild(indexCell);


                break;

            case relaysState:

                break;
        }

        return score_div;


    }

    this.parseSplits = function() {
        var splits_array = JSON.parse(this.splits);
        splits_array.push(this.time);

        var size = splits_array.length;

        var distance = [];
        var splits = [];
        var cut_50m = [];
        var cut_100m = [];
        var avg_50m = 0;
        var avg_100m = 0;



        for (var i = 0; i < size; i++) {

            current_distance = (i+1) * 50;
            distance[i] = current_distance;
            splits[i] = timeToString(stringToTime(splits_array[i]));
            if (i != 0) {
                if (current_distance % 50 === 0 && current_distance !== 50) {
                    if (splits_array[i] !== '' && splits_array[i-1] !== '') {

                        this_lap = '   ' + stringToTime(splits_array[i]);
                        prev_lap = stringToTime(splits_array[i - 1]);
                            cut_50m[i] = '+   ' + timeToString(this_lap - prev_lap);

                            avg_50m += (this_lap - prev_lap);

                    } else {
                        cut_50m[i] = -1;
                    }
                }
                if (current_distance % 100 === 0 && current_distance !== 100) {
                    this_lap = stringToTime(splits_array[i]);
                    if (i > 1) {
                        prev_lap = stringToTime(splits_array[i - 2]);
                    } else {
                        prev_lap = 0;
                    }
                    cut_100m[i] = '++ ' + timeToString(this_lap - prev_lap);

                    avg_100m += (this_lap - prev_lap);

                }
                else {
                    cut_100m[i] = -1;
                }
            } else {
                cut_50m[i] = -1;
                cut_100m[i] = -1;
                avg_50m += stringToTime(splits_array[i]);

            }

        }

        avg_50m = avg_50m / size;
        avg_50m = timeToString(avg_50m);

        if (avg_100m !== 0) {
            avg_100m = avg_100m / (size / 2);
            avg_100m = timeToString(avg_100m);
        }
        return [distance,splits,cut_50m,cut_100m,avg_50m,avg_100m];
    }

}

function eventItem(eid,name) {
    this.eid = eid;
    this.name = name;
}

function swimmerItem(swid, name) {
    this.swid = swid;
    this.name = name;
}

function relayScoreItem(rscid,eid,stroke,distance,swid1,swid2,swid3,swid4,time,age_group,rank_in_ag, points, location, date,course,gender,splits ) {
    this.rscid = rscid;
    this.eid = eid;
    this.stroke = stroke;
    this.distance = distance;
    this.swid1 = swid1;
    this.swid2 = swid2;
    this.swid3 = swid3;
    this.swid4 = swid4;
    this.time = time;
    this.age_group = age_group;
    this.rank_in_ag = rank_in_ag;
    this.points = points;
    this.location = location;
    this.date = date;
    this.course = course;
    this.gender = gender;
    this.splits = splits;

    this.display = function () {
        if (this.rscid === '11') {

            // console.log(this.parseSplits());

        }

        if (this.rscid === '12') {

            // console.log(this.parseSplits());

        }

        var relays_score_div = document.createElement('div');
        var first_row = document.createElement('div');
        first_row.setAttribute('class', 'tableRow');


        var indexCell = document.createElement('div');
        indexCell.setAttribute('class', 'tableCell-indexCell');
        first_row.appendChild(indexCell);

        var names = document.createElement('div');

        var names_arr = [getSwimmerNameById(this.swid1), getSwimmerNameById(this.swid2), getSwimmerNameById(this.swid3), getSwimmerNameById(this.swid4)];
        var lastName1 = names_arr[0].substr(names_arr[0].indexOf(" ") + 1);
        var lastName2 = names_arr[1].substr(names_arr[1].indexOf(" ") + 1);
        var lastName3 = names_arr[2].substr(names_arr[2].indexOf(" ") + 1);
        var lastName4 = names_arr[3].substr(names_arr[3].indexOf(" ") + 1);


        names.setAttribute('class', 'tableCell-name-relays');
        names.innerHTML = lastName1 + ',' + lastName2 + ',' + lastName3 + ',' + lastName4;
        first_row.appendChild(names);

        var stroke = document.createElement('div');
        stroke.setAttribute('class', 'tableCell-stroke');
        stroke.innerHTML = this.stroke;
        first_row.appendChild(stroke);


        var distance = document.createElement('div');
        distance.setAttribute('class', 'tableCell-distance');
        distance.innerHTML = this.distance;
        first_row.appendChild(distance);


        var time = document.createElement('div');
        time.setAttribute('class', 'tableCell-time');
        time.innerHTML = timeToString(stringToTime(this.time));
        first_row.appendChild(time);


        var plus = document.createElement('div');
        plus.setAttribute('class', 'tableCell-plus-off');
        plus.innerHTML = '+';


        var eventName = document.createElement('div');
        eventName.setAttribute('class', 'tableCell-eventName');
        eventName.innerHTML = getEventNameById(this.eid);
        // console.log(getEventNameById(1));
        first_row.appendChild(eventName);
        eventName.addEventListener('click', function () {
            gotoEvent(this.innerHTML);
        });

        var eventCourse = document.createElement('div');
        eventCourse.setAttribute('class', 'tableCell-eventCourse');
        eventCourse.innerHTML = this.course + 'M';
        first_row.appendChild(eventCourse);

        var location = document.createElement('div');
        location.setAttribute('class', 'tableCell-location');
        location.innerHTML = this.location;
        first_row.appendChild(location);


        var date = document.createElement('div');
        date.setAttribute('class', 'tableCell-date');
        date.innerHTML = dateFormatter(this.date);
        first_row.appendChild(date);


        var rank = document.createElement('div');
        rank.setAttribute('class', 'tableCell-rank');
        if (this.rank_in_ag > 3 || this.rank_in_ag == 0) {
            rank.innerHTML = this.rank_in_ag;
        } else {
            medal = document.createElement('img');
            medal.setAttribute('width', '20px');
            medal.setAttribute('height', '20px');
            rank.appendChild(medal);
            if (this.rank_in_ag == 1) {
                medal.src = 'css/gold.svg';

            }
            if (this.rank_in_ag == 2) {
                medal.src = 'css/silver.svg';

            }
            if (this.rank_in_ag == 3) {
                medal.src = 'css/bronze.svg';

            }


        }
        first_row.appendChild(rank);

        var points = document.createElement('div');
        points.setAttribute('class', 'tableCell-rank');
        points.innerHTML = this.points;
        first_row.appendChild(points);
        first_row.appendChild(plus);


        relays_score_div.appendChild(first_row);

        // var parsed_splits = JSON.parse(this.splits);

        var cut = 0;


        var splits_data = this.parseSplits();
        cut = splits_data[0];

        var splits_row = document.createElement('div');
        splits_row.setAttribute('class', 'splits-row');

        var splits_dash = document.createElement('div');
        splits_dash.setAttribute('class', 'splits-relay-table');


        for (var i = 1; i < 5; i++) {
            //consider using container for name+stroke+reaction time
            var splits_line = document.createElement('div');
            splits_line.setAttribute('class', 'splits-relays-line');

            var name_div = document.createElement('div');
            name_div.setAttribute('class', 'tableCell-name-relays-single');
            name_div.innerHTML = names_arr[i - 1];

            name_div.addEventListener('click', function () {
                gotoSwimmer(this.innerHTML);

            });

            splits_line.appendChild(name_div);

            var stroke_div = document.createElement('div');
            stroke_div.setAttribute('class', 'splits-relay-stroke');

            if (this.stroke === 'IM') {
                stroke_div.innerHTML = IMrelaysStrokes[i - 1];
            } else {
                stroke_div.innerHTML = 'FS';
            }

            splits_line.appendChild(stroke_div);
            // console.log(splits_data);
            for (var j = 0; j < splits_data[1][1].length; j++) {

                var single_split_block = document.createElement('div');
                single_split_block.setAttribute('class', 'splits-relay-block');

                var curr_distance = document.createElement('div');
                curr_distance.setAttribute('class', 'splits-relay-distance');
                curr_distance.innerHTML = splits_data[i][0][j];

                var curr_split = document.createElement('div');
                curr_split.setAttribute('class', 'splits-relay-time');
                curr_split.innerHTML = splits_data[i][1][j];


                var curr_50_cut = document.createElement('div');
                if (splits_data[i][2][j] !== -1 ) {
                    if (cut === 50) {
                        curr_50_cut.setAttribute('class', 'splits-relay-200cut');

                    }
                    else {
                        curr_50_cut.setAttribute('class', 'splits-relay-50cut');
                    }
                    curr_50_cut.innerHTML = '+  ' + splits_data[i][2][j];
                }

                var curr_100_cut = document.createElement('div');
                if (splits_data[i][3][j] !== -1 && cut >= 100) {
                    if (cut === 100) {
                        curr_100_cut.setAttribute('class', 'splits-relay-200cut');

                    }else {


                        curr_100_cut.setAttribute('class', 'splits-relay-100cut');
                    }
                    curr_100_cut.innerHTML = '++ ' + splits_data[i][3][j];
                }

                var curr_200_cut = document.createElement('div');
                if (splits_data[i][4][j] !== -1 && cut === 200) {
                    curr_200_cut.setAttribute('class', 'splits-relay-200cut');

                    curr_200_cut.innerHTML = '+++' + splits_data[i][4][j];
                }

                single_split_block.appendChild(curr_distance);
                single_split_block.appendChild(curr_split);
                single_split_block.appendChild(curr_50_cut);
                single_split_block.appendChild(curr_100_cut);
                single_split_block.appendChild(curr_200_cut);
                splits_line.appendChild(single_split_block);

            }
            splits_dash.appendChild(splits_line);
        }
        splits_row.appendChild(splits_dash);

        var last_line = document.createElement('div');
        last_line.setAttribute('class','splits-last-line');


        var age_group_block = document.createElement('span');
        age_group_block.setAttribute('class','splits-relay-ag')
        var age_group_caption = document.createElement('div');
        age_group_caption.innerHTML = 'Age Group:';
        var age_group_value = document.createElement('div');
        age_group_value.innerHTML = this.age_group;

        age_group_block.appendChild(age_group_caption);
        age_group_block.appendChild(age_group_value);
        last_line.appendChild(age_group_block);

        var total_time_block = document.createElement('span');
        total_time_block.setAttribute('class','splits-relay-total-time');

        var total_time_caption = document.createElement('div');
        total_time_caption.innerHTML = 'Total Time:';
        var total_time_value = document.createElement('div');
        total_time_value.setAttribute('class','splits-relay-200cut');

        total_time_value.innerHTML = this.time;

        total_time_block.appendChild(total_time_caption);
        total_time_block.appendChild(total_time_value);
        last_line.appendChild(total_time_block);
        splits_dash.appendChild(last_line);
        //add reaction time per swimmer
        relays_score_div.appendChild(splits_row);


        switch (board_state.id) {
            case 'speed':
                break;

            case 'swimmer':
                first_row.removeChild(indexCell);
                break;
            case 'all':
                first_row.removeChild(indexCell);
                break;
            case 'event':
                first_row.removeChild(location);
                first_row.removeChild(date);
                first_row.removeChild(eventName);
                first_row.removeChild(indexCell);

                break;

            case relaysState:

                break;
        }

        relays_score_div.appendChild(splits_row);


        plus.setAttribute('class', 'tableCell-plus-active');
        plus.addEventListener('click', function () {
            $(splits_row).slideToggle('fast');
            if (relays_score_div.className === 'tableRow-selected') {
                relays_score_div.setAttribute('class', 'tableRow');
                plus.innerHTML = '+';


            }
            else
            {
                relays_score_div.setAttribute('class', 'tableRow-selected');
                plus.innerHTML = '-';

            }
        });


        return relays_score_div;

    }

    this.parseSplits = function() {
        var splits_array = JSON.parse(this.splits);
        splits_array.push(this.time);

        var cut = 0;
        switch (this.distance) {
            case '4 X 50':
                cut = 50;
                break;
            case '4 X 100':
                cut = 100;
                break;
            case '4 X 200':
                cut = 200;
                break;
        }

        var size = splits_array.length;

        var distance = [];
        var splits = [];
        var cut_50m = [];
        var cut_100m = [];
        var cut_200m = [];


        // console.log(splits_array);
        var result = [];

        var j = 0; //index of swimmer

        for (var i = 0; i < size; i++) {
            current_distance = (i+1) * 50;


            distance[i] = current_distance;
            splits[i] = timeToString(stringToTime(splits_array[i]));
            if (i != 0) {

                    if (current_distance % 50 === 0) {
                        if (splits_array[i] !== '' && splits_array[i-1] !== '') {

                            this_lap = stringToTime(splits_array[i]);
                        prev_lap = stringToTime(splits_array[i - 1]);

                        cut_50m[i] = timeToString(this_lap - prev_lap);


                    }else {
                            cut_50m[i] = -1;
                        }
                }
                if (current_distance % 100 === 0) {
                    this_lap = stringToTime(splits_array[i]);
                    if (i > 1) {
                        prev_lap = stringToTime(splits_array[i - 2]);
                    } else {
                        prev_lap = 0;
                    }
                    cut_100m[i] = timeToString(this_lap - prev_lap);


                }
                else {
                    cut_100m[i] = -1;
                }
                if (current_distance % 200 === 0) {
                    this_lap = stringToTime(splits_array[i]);
                    if (i > 3) {
                        prev_lap = stringToTime(splits_array[i - 4]);
                    } else {
                        prev_lap = 0;
                    }
                    cut_200m[i] = timeToString(this_lap - prev_lap);


                }
                else {
                    cut_200m[i] = -1;
                }


            } else {
                cut_50m[i] = -1;
                cut_100m[i] = -1;
                cut_200m[i] = -1;
            }

        }
        var index = cut / 50;

        var swimmer1 = [distance.slice(0,index),splits.slice(0,index),cut_50m.slice(0,index),cut_100m.slice(0,index),cut_200m.slice(0,index)];
        var swimmer2 = [distance.slice(index, 2*index),splits.slice(index, 2*index),cut_50m.slice(index, 2*index),cut_100m.slice(index, 2*index),cut_200m.slice(index, 2*index)];
        var swimmer3 = [distance.slice(2*index, 3*index),splits.slice(2*index, 3*index),cut_50m.slice(2*index, 3*index),cut_100m.slice(2*index, 3*index),cut_200m.slice(2*index, 3*index)];
        var swimmer4 = [distance.slice(3*index, size),splits.slice(3*index, size),cut_50m.slice(3*index, size),cut_100m.slice(3*index, size),cut_200m.slice(3*index, size)];


        // return [distance,splits,cut_50m,cut_100m,cut_200m];

        return [cut,swimmer1,swimmer2,swimmer3,swimmer4];
    }

}

function buildSearchBar() {
    var state = getStateByButtonId(board_state.id);
    var source = null;

    if (state === swimmerState) {
        source = allSwimmers;

    }else {
        source = allEvents;
    }

    var search_box_container = document.createElement('span');
    var img = document.createElement('img');


    var search = document.createElement('input');
    search.setAttribute('type', 'text');
    search.setAttribute('id', 'searchbox');
    search.setAttribute('class', 'searchbar');
    search_box_container.appendChild(search);


    var list_container = document.createElement('div');
    list_container.setAttribute('id','itemsList');
    list_container.setAttribute('class','searchbar-content');


    source.forEach(function (element)        {
        var li = document.createElement('div');
        li.setAttribute('class','searchbar-li');

        li.innerHTML = element.name;
        li.setAttribute('id',element.name );
        list_container.appendChild(li);

        li.addEventListener('click',function() {

            if (state === swimmerState) {
                gotoSwimmer(this.innerHTML);
            }
            else {
                gotoEvent(this.innerHTML);
            }
            // if (state && optName) {
            //     var nameOptions = state.buttonOptName[optName];
            //
            //     console.log(this.id);
            //     while (state[optName] != this.id)
            //     {
            //         nameOptions.push(state[optName]);
            //         state[optName] = nameOptions.shift();
            //         // console.log(this.id,state[optName], nameOptions);
            //     }
            //     render_display('select');
            // }

        },false);
    });

    search_box_container.appendChild(list_container);
    search.addEventListener('focus', function(){
        $('#itemsList').slideToggle('fast');
    });
    search.addEventListener('focusout', function() {
        $('#itemsList').slideToggle('slow');


    });
    search.addEventListener('keyup', function () {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('searchbox');
        filter = input.value.toUpperCase();
        ul = document.getElementById("itemsList");
        li = ul.childNodes;

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].innerHTML;
            txtValue = a;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });


    return search_box_container;
}

function buildOptionBar(optName) {



    var state = getStateByButtonId(board_state.id);
/*
    console.log(state.buttonOptName[optName]);
*/

    var option_box_container = document.createElement('span');
    option_box_container.setAttribute('class','optionbar-wrapper');
    option_box_container.setAttribute('id',optName + '-wrapper');

    var page_button = document.createElement('div');

    page_button.setAttribute("id", optName);
    page_button.setAttribute("class", 'page-button-option');
    page_button.innerHTML = state[optName];

    option_box_container.appendChild(page_button);

    var list_container = document.createElement('div');
    list_container.setAttribute('id','optionList-' + optName);
    list_container.setAttribute('class','optionbar-content');

    if (state === speedState) {

        if (optName === 'stroke') {
            page_button.addEventListener('click', function(e){
                e.stopPropagation();
                $(list_container).slideToggle('slow');
            });
            allStrokes.forEach(function(element) {
                var li = document.createElement('div');
                li.setAttribute('class', 'optionbar-li');

                li.innerHTML = element;
                li.setAttribute('id', 'optionButton');
                list_container.appendChild(li);

                li.addEventListener('click', function () {


                    speedState['stroke'] = li.innerHTML;
                    dist_list = document.getElementById('optionList-distance');
                    dist_wrapper = document.getElementById('distance-wrapper');
                    dist_wrapper.removeChild(dist_list);


                    dist_list = build_distance_option_list(li.innerHTML);
                    dist_wrapper.appendChild(dist_list);

                    page_button.innerHTML = speedState['stroke'];

                    if (!(is_valid_distance(speedState['stroke'],speedState['distance']))) {
                        if (speedState['stroke'] !== 'IM') {
                            speedState['distance'] = 50;
                        } else {
                            speedState['distance'] = 100;
                        }
                        document.getElementById('distance').innerHTML = speedState['distance'];
                    }

                    $(list_container).slideToggle('slow');

                    render_display('option');


                    // check if current distance is legal
                    //update the distance list
                    //render display
                    //im is special
                });
            });
        } else if (optName === 'distance') {
            list_container = build_distance_option_list(speedState['stroke']);
            // page_button.addEventListener('click', function(e){
            //     e.stopPropagation();
            //     $(list_container).slideToggle('slow');
            // });
            page_button.addEventListener('click', function(e) {
                e.stopPropagation();

                $('#optionList-distance').slideToggle('slow');
            });

        }


    } else {
        page_button.addEventListener('click', function(e){
            e.stopPropagation();
            $(list_container).slideToggle('slow');
        });

        state.buttonOptName[optName].forEach(function (element) {
            var li = document.createElement('div');
            li.setAttribute('class', 'optionbar-li');

            li.innerHTML = element;
            li.setAttribute('id', 'optionButton');
            list_container.appendChild(li);

            li.addEventListener('click', function () {


                state.buttonOptName[optName].push(state[optName]);

                var index = state.buttonOptName[optName].indexOf(li.innerHTML);
                if (index > -1) {
                    state.buttonOptName[optName].splice(index, 1);
                }

                swap = state[optName];
                state[optName] = li.innerHTML;
                li.innerHTML = swap;

                page_button.innerHTML = state[optName];

                $(list_container).slideToggle('slow');

                render_display('option');

            }, false);


        });



    }

    option_box_container.appendChild(list_container);


    return option_box_container;
}

function build_distance_option_list(stroke) {
    var list_container = document.createElement('div');
    list_container.setAttribute('id','optionList-distance');
    list_container.setAttribute('class','optionbar-content');

    allDistances.forEach(function(element) {
        if (is_valid_distance(stroke,element)) {
            var li = document.createElement('div');
            li.setAttribute('class', 'optionbar-li');

            li.innerHTML = element;
            li.setAttribute('id', 'optionButton');
            list_container.appendChild(li);

            li.addEventListener('click', function (e) {
                speedState['distance'] = li.innerHTML;
                var page_button = document.getElementById('distance');
                page_button.innerHTML = speedState['distance'];

                render_display('option');
                e.stopPropagation();
                $(list_container).slideToggle('slow');
            });
        }
    });
    return list_container;
}

function timeToString(inputMsTime) {
    var miliseconds = inputMsTime % 1000;
    var seconds = inputMsTime / 1000;

    var hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;

    var minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    var ret = null;

    if (miliseconds > 100) {
        miliseconds = miliseconds / 100;
    }
    while (isFloat(miliseconds)) {
        miliseconds = miliseconds * 10;
    }
    if (hours === 0) {
        ret = padNumber(minutes) + ':' + padNumber(seconds) +'.' + miliseconds;
    } else {
        ret = padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(seconds) +'.' + miliseconds;
    }
    // console.log(hours,minutes,seconds,miliseconds);
    return ret;
}

function stringToTime(inputTimeString) {
    if (inputTimeString === '') {
        return 0;
    }
    var ret = inputTimeString.split(':');
    var hours = ret[0];
    var minutes = ret[1];
    if (ret[2]) {
        var seconds_ret = ret[2].split('.');
        var seconds = seconds_ret[0];
        if (seconds_ret[1]) {
            var miliseconds = seconds_ret[1];
        }
        else {
            miliseconds = '0';
        }
    }
    var msTime = (parseInt(hours) * 3600000) + (parseInt(minutes) * 60000) + (parseInt(seconds) * 1000) + (parseInt(miliseconds));
    // console.log(msTime);
    return msTime
}

function padNumber(number) {
    if (number<10) {
        number = ("0" + number);
    }
    return number;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function buildTableCaptions() {
    var state = getStateByButtonId(board_state.id);
    var labels = state.tableCaptions();

    var row = document.createElement('div');
    row.setAttribute('class','tableCellHeadline');


    labels.forEach(function (element) {
        var new_div = document.createElement('div');
        new_div.setAttribute('class', element.sty);
        new_div.innerHTML = element.caption;
        row.appendChild(new_div)

    });
    return row;

}

function dateFormatter(dateString) {
    var ret = dateString.split('-');
    return ret[2] + '/' + ret[1] + '/' + ret[0];
}

function randomizeSwimmerId(allSwimmers) {

}

function getSwimmerIdByName(inputName) {
    var max = allSwimmers.length;
    for (var count = 0; count < max; count++) {
        var i = count;
        if (allSwimmers[i].name == inputName)
            return allSwimmers[i].swid;
    }
    return null;
}

function getSwimmerNameById(swid) {
    var max = allSwimmers.length;
    for (var count = 0; count < max; count++) {
        var i = count;
        if (allSwimmers[i].swid == swid)
            return allSwimmers[i].name;
    }
    return null;
}

function getEventIdByName(inputName) {
    var max = allEvents.length;
    for (var count = 0; count < max; count++) {
        var i = count;
        if (allEvents[i].name == inputName)
            return allEvents[i].eid;
    }
    return null;
}

function getEventNameById(eid) {
    var max = allEvents.length;
    for (var count = 0; count < max; count++) {
        var i = count;
        if (allEvents[i].eid === eid) {
            return allEvents[i].name;
        }
    }
    return null;
}

function is_valid_distance(inStroke,inDistance) {
    var legal_strokes = [
        '50 Free',
        '100 Free',
        '200 Free',
        '400 Free',
        '800 Free',
        '1500 Free',

        '50 Breast',
        '100 Breast',
        '200 Breast',

        '50 Back',
        '100 Back',
        '200 Back',

        '50 FLY',
        '100 FLY',
        '200 FLY',
        '100 IM',
        '200 IM',
        '400 IM',
    ];

    input = inDistance.toString() + " " + inStroke;
    if (legal_strokes.includes(input))
        return true;
    return false;
}

function get_valid_distances_by_stroke(stroke) {
    var distance_array = allDistances.slice(0);
    var ret = [];

    distance_array.forEach(function (distance){
        if ((is_valid_distance(stroke,distance))) {
            ret.push(distance);
        }
    });
    return ret;
}

function setAgeGroupString(ageGroup) {
    ret = "";
    switch (ageGroup) {
        case 0:
            ret = '<img  src="css/stCrown.png" width="25" height="25">';
            //   var img = document.createElement("img");
            //     img.src = "css/stCrown.png";
            //     img.width = "20";
            //     img.height = "20";
            // var src = document.getElementById("ageGroup");

            break;
        case 21:
            ret = "21-29";
            break;
        default:
            ret = ageGroup.toString() + "-" + (parseInt(ageGroup) + 4).toString();

    }
    return ret;
}

function getStateByButtonId(buttonId) {
    var state = null;

    switch (buttonId) {
        case 'speed' : {
            state = speedState;
            break;
        }
        case 'relays' :{
            state = relaysState;
            break;
        }
        case 'swimmer' :{
            state = swimmerState;
            break;

        }
        case 'event' :{
            state = eventState;
            break;

        }
        case 'all' :{
            state = allScoresState;
            break;

        }
        case 'about' : {
            state = aboutState;
            break;
        }

    }
    return state;

}

function buildPageButtons(buttonId) {
    var new_div;

    var pageButtons = document.getElementById("page_buttons");

    //clearing  page_buttons
    while (pageButtons.firstChild) {
        pageButtons.removeChild(pageButtons.firstChild);
    }

    var newButtons = getStateByButtonId(buttonId);
    if (newButtons === swimmerState) {


    }


    for(var buttonName in newButtons.buttonOptName)
    {


        new_div = document.createElement("Div");
        new_div.setAttribute("id", buttonName);
        new_div.setAttribute("class", 'page-button');
        new_div.innerHTML = newButtons[buttonName];
        if (new_div.id === 'ageGroup' && newButtons === speedState && speedState.ageGroup === 0) {
            new_div.innerHTML = '<img  src="css/stCrown.png" width="25" height="25">';
            // new_div.setAttribute('class', 'page-button-crown');
        }
        if (buttonName == 'swimmerCriteria' || buttonName == 'eventCriteria' || buttonName == 'allScoresCriteria') {
            description = document.createElement("Div");
            description.setAttribute("class", 'page-button-description');
            description.setAttribute("id", 'description');
            description.innerHTML = "Sort by";
            document.getElementById('page_buttons').appendChild(description);

        }
        if (buttonName == 'stroke' || buttonName == 'distance' || buttonName == 'allScoresCriteria' || buttonName == 'swimmerCriteria' || buttonName == 'eventCriteria') {
            document.getElementById('page_buttons').appendChild(buildOptionBar(buttonName));

        }

        else if (buttonName == 'swimmerName' || buttonName == 'eventName') {
            // + '<BR>' + buttonName;

            document.getElementById('page_buttons').appendChild(buildSearchBar());


        } else {
            document.getElementById('page_buttons').appendChild(new_div);
        }
    }
}

function render_display(buttonClicked) {
    // console.log(buttonClicked);
    if (buttonClicked === 'description' || buttonClicked === 'swimmersList') {
        return;
    }


    $('#page').fadeOut('fast');
    document.getElementById('page').innerHTML = "";

    if (board_state == 0) {
        document.getElementById('page').innerHTML = '<div class="landing-main">STATS HERE</div>'
        document.getElementById('title').innerHTML ='TLV NEMOS SCORE BOARD';
        stateStats();
    }
    else {
        var state = getStateByButtonId(board_state.id); //get the state (not related to button pressed
        if (state) {

            var options = state.buttonOptName[buttonClicked];
        }


        if (buttonClicked == 'next' || buttonClicked == 'prev') {
            optName = null;
            if (state === swimmerState) {
                optName = 'swimmerName';
            }
            else if (state === eventState) {
                optName = 'eventName';
            }
            nameOptions = state.buttonOptName[optName];


            if (buttonClicked == 'next') {
                nameOptions.push(state[optName]);
                state[optName] = nameOptions.shift();
            } else {
                nameOptions.unshift(state[optName]);
                state[optName] = nameOptions.pop();
            }
        }

        if (buttonClicked != 0 && buttonClicked != 'search' && buttonClicked != 'select' && buttonClicked != 'option') {
            options.push(state[buttonClicked]);
            state[buttonClicked] = options.shift();
        }

        if (state === speedState) {
            if (buttonClicked == 'stroke' || buttonClicked == 'distance') {
                while (!(is_valid_distance(speedState.stroke, speedState.distance))) {
                    speedState.buttonOptName['distance'].push(speedState.distance);
                    speedState.distance = speedState.buttonOptName['distance'].shift();
                }
                document.getElementById('distance').innerHTML = speedState.distance;
            }
            document.getElementById('page').innerHTML = "";

        }

        state.query();
        $('#page').fadeIn('fast');
        stateStats(board_state.id);
    }
    if (buttonClicked != 0 && (buttonClicked != 'next' || buttonClicked != 'prev') && buttonClicked != 'select'  && buttonClicked != 'option') {
        document.getElementById(buttonClicked).innerHTML = state[buttonClicked];
        if (board_state.id == 'speed' && buttonClicked == 'ageGroup')
            document.getElementById(buttonClicked).innerHTML = setAgeGroupString(speedState.ageGroup);
    }


}

function get_init_data () {
    jQuery.ajax({
        type: "POST",
        url: 'nemos_main.php',
        dataType: 'json',
        async: false,

        data: {functionname: 'get_swimmers_names', arguments: []},

        success: function (obj, textstatus) {

            if (!('error' in obj)) {
                yourVariable = obj.result;
                yourVariable.forEach(function (element){
                    new_swimmer = new swimmerItem(element.swid,element.name);
                    allSwimmers.push(new_swimmer);
                })
            }
            else {
                // console.log(obj.error);

            }
        }
    });

    jQuery.ajax({
        type: "POST",
        url: 'nemos_main.php',
        dataType: 'json',
        async: false,

        data: {functionname: 'get_event_names', arguments: []},

        success: function (obj, textstatus) {

            if (!('error' in obj)) {
                yourVariable = obj.result;
                yourVariable.forEach(function (element){
                    new_event = new eventItem(element.eid,element.name);
                    allEvents.push(new_event);

                })
            }
            else {
                // console.log(obj.error);
                // console.log(obj);

            }
        }
    });
}

function buildResultTable(resultScoresTable, currentState) {

    var table = document.createElement('div');
    table.setAttribute('class', 'tableMain');
    table.setAttribute('id', 'main_table');
    if (currentState) {
        var state = getStateByButtonId(currentState.id);
    }

    for (i=0; i<resultScoresTable.length; i++) {
        var     score_row = resultScoresTable[i].display();
        // console.log(score_row);
        score_row.setAttribute('id', i);
        if (state === speedState || state === relaysState) {
            var indexCell = score_row.getElementsByClassName('tableCell-indexCell')[0];
            indexCell.innerHTML = (i + 1);
        }
        table.appendChild(score_row);

    }
    return table;
}

function stateStats(buttonClicked) {
    // console.log(currState);
    var state = getStateByButtonId(buttonClicked);
    var title = document.getElementById('title');
    var subtitle = document.getElementById('subtitle');
    var stats = document.getElementById('stats');
    subtitle.innerHTML = '';
    stats.innerHTML = '';

    var header = document.getElementById('header');

// console.log(state);
    if (state) {
        title.innerHTML = state.caption();
    }

    if (state === swimmerState) {

        var swid = getSwimmerIdByName(swimmerState.swimmerName)
        // console.log(swid);


        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_swimmer_stats', arguments: [swid]},
            success: function (obj, textstatus) {
                var ret = [];

                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    // console.log(yourVariable);
                    subtitle.innerHTML = setAgeGroupString(yourVariable.current_age_group);
                    delete yourVariable.current_age_group;
                    stats.innerHTML = '';
                    stats.appendChild(buildStatsDashboard(yourVariable));

                }
                else {
                    // console.log(obj.error);
                }
            }
        });
    }

    if (state === eventState) {
        var eid = getEventIdByName(eventState.eventName)


        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_event_stats', arguments: [eid]},
            success: function (obj, textstatus) {
                var ret = [];

                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    // console.log(yourVariable['num_of_participants'][Object.keys(yourVariable['num_of_participants'])[0]]);
                    out = '';
                    out += yourVariable['event_info'][0]['location'] + ', ' + dateFormatter(yourVariable['event_info'][0]['date']) + ', ';

                    if (yourVariable['event_info'][0]['course'] === '25') {
                        out += 'short course';

                    } else {
                        out += 'long course';
                    }
                    subtitle.innerHTML = out;
                    delete yourVariable.event_info;
                    stats.innerHTML = '';
                    stats.appendChild(buildStatsDashboard(yourVariable));

                }
                else {
                    // console.log(obj.error);
                }
            }
        });
    }

    if (state === speedState) {

        var out = 'Fastest Nemo ';

        if (speedState.gender === 'M') {
            out += 'males ';
        }else {
            out += 'females ';
        }

        out += 'in ' + speedState.distance + ' ' + speedState.stroke;
        if (speedState.course === 25) {
            out += ', on short course';
        }else {
            out += ', on long course';
        }

        if (!(speedState.ageGroup === 0 || speedState.ageGroup === 'Club Records')) {
            out += ', in ' + setAgeGroupString(speedState.ageGroup) + ' age group'
        }


        subtitle.innerHTML = out;

    }

    if (state === relaysState) {
        var out = 'Fastest ';
        if (relaysState.gender === 'M') {
            out += 'male ';
        }else if (relaysState.gender === 'F') {
            out += 'female ';
        }else {
            out += 'mix ';
        }

        out += 'relays in ' + relaysState.distance + ' ' + relaysState.stroke;
        if (relaysState.course === 25) {
            out += ', on short course';
        }else {
            out += ', on long course';
        }

        if (!(relaysState.ageGroup === 0 || relaysState.ageGroup === 'Club Record')) {
            out += ', in ' + relaysState.ageGroup + ' age group'
        }


        subtitle.innerHTML = out;
    }

    if (board_state === 0) {
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'get_club_stats', arguments: []},
            success: function (obj, textstatus) {
                var ret = [];

                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    // console.log(yourVariable);


                    // document.getElementById('page').appendChild(table);
                }
                else {
                    // console.log(obj.error);
                }
            }
        });
    }



}

function buildStatsDashboard(statsArray) {
    var stats_dash = document.createElement('div');
    stats_dash.setAttribute('class','stat-dash');

    for (var key in statsArray) {
        // console.log(statsArray[key]);
        var stat_block = document.createElement('div');
        stat_block.setAttribute('class','stat-box');
        var stat_caption_container = document.createElement('div');
        stat_caption_container.setAttribute('class','stat-caption-container');

        var stat_caption = document.createElement('div');
        stat_caption.setAttribute('class','stat-caption');
        stat_caption.innerHTML = statsArray[key][0];

        var stat_value_container = document.createElement('div');
        stat_value_container.setAttribute('class','stat-value-container');

        var stat_value = document.createElement('div');
        stat_value.setAttribute('class','stat-value');
        stat_value.innerHTML = statsArray[key][1];
        stat_caption_container.appendChild(stat_caption);
        stat_value_container.appendChild(stat_value);

        stat_block.appendChild(stat_caption_container);
        stat_block.appendChild(stat_value_container);
        stats_dash.appendChild(stat_block);
    }
    return stats_dash;

}

function board_init () {
    get_init_data();

    speedState.buttonOptName['stroke'] = allStrokes.slice(0);
    speedState.buttonOptName['distance'] = allDistances.slice(0);
    speedState.buttonOptName['gender'] = allGenders.slice(0);
    speedState.buttonOptName['ageGroup'] = allAgeGroups.slice(0);
    speedState.buttonOptName['course'] = allCourses.slice(0);

    for (i =0; i < allSwimmers.length; i++) {
        swimmerState.buttonOptName['swimmerName'].push(allSwimmers[i].name);
    }
    for (i =0; i < allEvents.length; i++) {
        eventState.buttonOptName['eventName'].push(allEvents[i].name);
    }
    var allStates = document.getElementById('main_buttons').children;


    for( i=0; i < allStates.length; i++ ) {
        var currentState = getStateByButtonId(allStates[i].id);
        for(var pageButton in currentState.buttonOptName) {
            currentState[pageButton] = currentState.buttonOptName[pageButton].shift();
        }

    }
    document.getElementById('page').innerHTML = '<div class="landing-main">TLV NEMOS</div>';

}

function gotoSwimmer(name) {
    var state = getStateByButtonId(board_state.id);
    var source = allSwimmers;
    var optName = 'swimmerName';

    if (state !== swimmerState) {
        document.getElementById('swimmer').click();
    }

    if (optName) {
        var nameOptions = swimmerState.buttonOptName[optName];

        while (swimmerState[optName] !== name)
        {
            nameOptions.push(swimmerState[optName]);
            swimmerState[optName] = nameOptions.shift();
        }
        render_display('select');
    }
}

function gotoEvent(name) {
    var state = getStateByButtonId(board_state.id);
    var optName = 'eventName';

    if (state !== eventState) {
        document.getElementById('event').click();
    }

    if (optName) {
        var nameOptions = eventState.buttonOptName[optName];

        while (eventState[optName] !== name)
        {
            nameOptions.push(eventState[optName]);
            eventState[optName] = nameOptions.shift();
            // console.log(this.id,state[optName], nameOptions);
        }
        render_display('select');
    }
}

$('#logo').on('click', function(e) {
    if (board_state != 0) {
        board_state = 0;
        last_board_state === $(this)[0];

        $("#page_buttons").slideToggle();
        render_display(0);

        e.stopPropagation();
        e.preventDefault();
    }
});

$(document).ready(function() {
    $("#page_buttons").hide();
    board_init();
    render_display(0);




    $('#page_buttons').on('click','div', function(e) {
        if (this.classList.contains('page-button')) {
            render_display($(this)[0].id);
        }
    });



    var timeout = 1000;
    var action = function() {
        if (board_state === document.getElementById('speed') && speedState.ageGroup === 0) {

            if (!($('div.fish').hasClass('fast'))) {
                $('div.fish').toggleClass('fast');
            }
        }else
        if ($('div.fish').hasClass('fast')) {
            $('div.fish').toggleClass('fast');
        }

        // Do stuff here
        setTimeout(action, timeout);
    };
    action();

});

$('#main_buttons').children().on('click', function(e){

    $('div.fish').toggleClass("fast");
    setTimeout(function(){
        $('div.fish').toggleClass("fast")}, 500);


    if (board_state != 0) {
        board_state.classList.toggle('clicked');
    }

    if (board_state === $(this)[0]) {
        board_state = 0;
        last_board_state === $(this)[0];
        $("#page_buttons").slideToggle();
        render_display(0);

        e.stopPropagation();
        e.preventDefault();


    }



    else if (board_state == 0) {
        if (!(last_board_state === $(this)[0])) {
            board_state = $(this)[0];

            buildPageButtons($(this)[0].id);

        }

        board_state = $(this)[0];
        last_board_state = 0;
        $("#page_buttons").slideToggle();
        e.stopPropagation();
        e.preventDefault();



    } else {
        last_board_state = board_state;
        board_state = $(this)[0];
        $("#page_buttons").slideToggle();
        e.stopPropagation();
        e.preventDefault();
        var newButtons = $(this)[0];


        setTimeout(function() {
            buildPageButtons(newButtons.id);
            $("#page_buttons").slideToggle();
            e.stopPropagation();
            e.preventDefault();
        }, 500)}

    if (board_state != 0) {
        board_state.classList.toggle('clicked');

        setTimeout(function() {
            render_display(0);
        }, 500);
    }
    if (board_state.id == 'about') {
        dashboard = document.getElementById('page_buttons');
    }

});
$(document).click(function(){
    if ($('#optionList').is(":visible")) {
        $("#optionList").hide();

    }

    if ($('#optionList').is(":visible")) {
        $("#optionList").hide();

    }

});

