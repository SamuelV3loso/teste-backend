module.exports = {
    
        getTotal: function getTotal(){
            var Regionals = "SELECT a.regional description, (b.sim / a.total)*100 average FROM " + 
            "(SELECT DISTINCT COUNT(students.id) total, students.regional FROM students INNER JOIN answers ON " +
            "students.id = answers.student_id GROUP BY students.regional ORDER BY students.regional) a INNER JOIN " +
            "(SELECT COUNT(students.id) sim, students.regional FROM students INNER JOIN answers ON students.id = " +
            "answers.student_id AND alternative_id = '37' GROUP BY students.regional ORDER BY students.regional) " +
            "b ON a.regional = b.regional";
        
            return Regionals;
            
        },
    
        getNational: function getNational(){
            var National = "SELECT ((SELECT count(answers.id) FROM answers WHERE alternative_id = '37') " +
            "/ (SELECT count(students.id) FROM students INNER JOIN answers ON students.id = answers.student_id)) " +
            "* 100 national";
            return National;
        },
        
        getByStates: function getByStates(state){
    
            if(state.length == 1 && state[0].length == 2){
                var ByState = "SELECT a.regional description, (a.sim / b.total)*100 average FROM (SELECT COUNT"+
                "(students.id) sim, students.regional FROM students INNER JOIN answers ON students.id = answers."+
                "student_id AND alternative_id = '37' AND regional = '" + state +"') a INNER JOIN (SELECT DISTINCT COUNT"+
                "(students.id) total, students.regional FROM students INNER JOIN answers ON students.id = answers"+
                ".student_id AND regional = '" + state +"') b ON a.regional = b.regional";
    
                return ByState;
            }
            else return err;
        }
    }