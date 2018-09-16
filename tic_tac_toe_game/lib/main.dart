import 'package:flutter/material.dart';

void main(){
  return runApp(
    new MaterialApp(
      title: 'Tic Tac Toe',
      home:new Home()
    )
  );
}

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Tic Tac Toe'),
        centerTitle: true,
        backgroundColor: Colors.blueAccent,
      ),
      body: new Center(
        child: new Container(
          padding: EdgeInsets.all(14.0),
          child: new Column(
            children: <Widget>[
              new Container(
                child: new Table(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
class Table extends StatefulWidget {
  @override
  _TableState createState() => _TableState();
}

enum TileState{O,X,none}

class _TableState extends State<Table> {
  final int rows = 3;
  final int cols = 3;
  final double squarePadding = 50.0;
  final double fontSize=85.0;
  final double squarePaddingWithLetter=40.0;
  List<List<TileState>> gameState = new List<List<TileState>>();
  bool rradhaO = true;

  @override
  void initState() {
    initBoard();
    super.initState();
  }
  void initBoard(){
    for(int i=0;i<rows;i++){
      List<TileState> list=<TileState>[];
      for(int j=0;j<cols;j++){
          list.add(TileState.none);
      }
      gameState.add(list);
    }
  }
  void resetBoard(){
    for(int i=0;i<rows;i++){
      for(int j=0;j<cols;j++){
        gameState[i][j]=TileState.none;
      }
    }
    rradhaO=true;
  }
  @override
  Widget build(BuildContext context) {
    List<Column> gameCols = new List<Column>();

    for (int i = 0; i < rows; i++) {
      List<Row> gameRows = new List<Row>();
      for (int j = 0; j < cols; j++) {
        if(gameState[i][j]==TileState.none){
          gameRows.add(tileNone(i,j));
        }else if(gameState[i][j]==TileState.X){
          gameRows.add(tileX(i,j));
        }else{
          gameRows.add(tileO(i,j));
        }
      }
      gameCols.add(new Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: gameRows,
      )
      );
    }

    return Container(
      child:new Column(
        children: <Widget>[
          new Row(
            children: gameCols,
          ),
          new Padding(padding: EdgeInsets.all(19.4)),
          new FlatButton(onPressed: (){
            setState(() {
              resetBoard();
            });
          },color: Colors.cyan
              ,child: new Text("Reset Game",
          style: new TextStyle(color: Colors.white),))
        ],
      )

    );
  }

  void showTile(int i, int j) {
    if (gameState[i][j] == TileState.none) {
      if (rradhaO) {
        gameState[i][j] = TileState.O;
      } else {
        gameState[i][j] =TileState.X;
      }
    }
    checkRoutes();
   rradhaO=!rradhaO;
  }

  bool checkRoutes(){
    TilesCheck lastTileRow=TilesCheck(gameState[0][0],0);
    TilesCheck lastTileCol=TilesCheck(gameState[0][0],0);
    TilesCheck lastTileDiagLR=TilesCheck(gameState[0][0],0);
    TilesCheck lastTileDiagRL=TilesCheck(gameState[rows-1][0],0);
    TileState winningState=null;
    for(int i=0;i<rows;i++){
      lastTileRow.state=gameState[i][0];
      lastTileRow.counter=0;
      lastTileCol.state=gameState[0][i];
      lastTileCol.counter=0;
      for(int j=0;j<cols;j++){
        if(i==j) {
          if (gameState[i][j] == lastTileDiagLR.state)  {
           if(++lastTileDiagLR.counter==3&&lastTileDiagLR.state!=TileState.none){
             winningState=lastTileDiagLR.state;
             break;
           }
          } else {
            --lastTileDiagLR.counter;
          }
        }
        if(j==cols-i-1){
            if(gameState[i][j]==lastTileDiagRL.state){
              if(++lastTileDiagRL.counter==3&&lastTileDiagRL.state!=TileState.none){
                winningState=lastTileDiagRL.state;
                break;
              }
            }else{
              --lastTileDiagRL.counter;
            }
        }
        if(gameState[i][j]==lastTileRow.state){
          if(++lastTileRow.counter==3 && lastTileRow.state!=TileState.none){
            winningState=lastTileRow.state;
            break;
          }
        }
        if(gameState[j][i]==lastTileCol.state){
          if(++lastTileCol.counter==3 && lastTileCol.state!=TileState.none){
            winningState=lastTileCol.state;
            break;
          }
        }
      }
    }
    if(winningState!=null){
      _showFormDialog(winningState);
    }
  }

  Widget tileNone(i,j){
    return new Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        new GestureDetector(
            onTap: () {
              setState(() {
                showTile(i, j);
              });

            },
            child: new Container(
              margin: new EdgeInsets.all(10.0),
              padding: new EdgeInsets.all(squarePadding),
              color: Colors.blueAccent,
            )
        ),
      ],
    );
  }
  Widget tileX(i,j){
    return new Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        new GestureDetector(
            child: new Container(
              margin: new EdgeInsets.all(10.0),
              padding: EdgeInsets.only(left: 20.0,right: 20.0),
              child: new Text("X",
              style: new TextStyle(
                  fontSize: fontSize,
                  color: Colors.black,
                  fontWeight: FontWeight.bold
              ),),
            )
        ),
      ],
    );
  }
  Widget tileO(i,j){
    return new Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        new GestureDetector(
            child: new Container(
              margin: new EdgeInsets.all(10.0),
              padding: EdgeInsets.only(left: 20.0,right: 20.0),
              child: new Text("O",
              style: new TextStyle(
                fontSize: fontSize,
                color: Colors.black,
                fontWeight: FontWeight.bold
              ),),
            )
        ),
      ],
    );
  }
  void _showFormDialog(winningTile) {
    var alert = new AlertDialog(
      content: new Row(
        children: <Widget>[
            new Text((winningTile==TileState.O?"O":"X")+" player Won!")
        ],
      ),
      actions: <Widget>[
        new FlatButton(
            onPressed: () {
              setState(() {
                resetBoard();
              });
              Navigator.pop(context);
            },
            child: Text("Restart")
        ),
        new FlatButton(onPressed: () => Navigator.pop(context),
            child: Text("Cancel")
        )

      ],
    );
    showDialog(context: context,
        builder:(_) {
          return alert;

        });
  }
}
class TilesCheck{
  TileState state;
  int counter;
  TilesCheck(this.state,this.counter);
}
