actor {
    var penumpang : [var ?Text] = ["siti", null, null, null];

    public query func getPenumpang() : [?Text] {
        return penumpang;
    };

    public func tambahPenumpang(namaPenumpang : Text) : async [?Text] {
        for (p in penumpang) {
            if (p == ?namaPenumpang) {
                return penumpang;
            };
        };

        var firstEmptyIndex = -1;
        for (i in 0..penumpang.size() - 1) {
            if (penumpang[i] == null) {
                firstEmptyIndex := i;
                break;
            };
        };

        var newPenumpang = Array.make(penumpang.size(), null);
        for (i in 0..penumpang.size() - 1) {
            newPenumpang[i] := penumpang[i];
        };

        if (firstEmptyIndex != -1) {
            newPenumpang[firstEmptyIndex] := ?namaPenumpang;
        } else {
            newPenumpang := newPenumpang # [?namaPenumpang];
        };

        penumpang := newPenumpang;
        return penumpang;
    };

    public func hapusPenumpang(namaPenumpang : Text) : async [?Text] {
        var indexToRemove = -1;
        for (i in 0..penumpang.size() - 1) {
            if (penumpang[i] == ?namaPenumpang) {
                indexToRemove := i;
                break;
            };
        };

        if (indexToRemove != -1) {
            var newPenumpang = Array.make(penumpang.size(), null);
            for (i in 0..penumpang.size() - 1) {
                newPenumpang[i] := penumpang[i];
            };
            newPenumpang[indexToRemove] := null;
            penumpang := newPenumpang;
        };
        
        return penumpang;
    };
};